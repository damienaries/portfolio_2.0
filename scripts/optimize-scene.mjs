// Rebuild an optimized copy; preserve every mesh, material and scene node.
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { FloatType } from 'three';

const MODEL_SOURCE = 'public/models/LA-hills-web-v2.glb';
const MODEL_OUTPUT = 'public/models/LA-hills-web-v3.glb';
const SKY_SOURCE = 'public/environments/kloppenheim_06_puresky_2k.hdr';
const SKY_OUTPUT = 'public/environments/kloppenheim_06_puresky_1k.hdr';

// GLB chunks and buffer views must start on four-byte boundaries.
function paddingLength(byteLength) {
	return (4 - (byteLength % 4)) % 4;
}

async function optimizeModel() {
	const source = await fs.readFile(MODEL_SOURCE);
	// Read the JSON chunk followed by the embedded binary chunk.
	const jsonLength = source.readUInt32LE(12);
	const gltf = JSON.parse(source.subarray(20, 20 + jsonLength).toString());
	const bin = source.subarray(28 + jsonLength);
	const images = new Map(gltf.images.map((image) => [image.bufferView, image]));
	const chunks = [];
	let offset = 0;
	const seenImages = new Map();
	for (let i = 0; i < gltf.bufferViews.length; i++) {
		const view = gltf.bufferViews[i];
		let data = bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
		const image = images.get(i);
		if (image) {
			const original = data.length;
			const originalData = data;
			// High-quality JPEG normals retain small shading variations; no alpha is used.
			const meta = await sharp(data).metadata();
			if (meta.hasAlpha) {
				const stats = await sharp(data).stats();
				if (stats.channels[3]?.min !== 255)
					throw new Error('Transparent texture requires lossless preservation: ' + image.name);
			}
			const normal = /Normal/i.test(image.name);
			data = await sharp(data)
				.removeAlpha()
				.resize({ width: normal ? 512 : 1024, withoutEnlargement: true })
				.jpeg({ quality: normal ? 96 : 88, chromaSubsampling: '4:4:4' })
				.toBuffer();
			if (data.length < original) image.mimeType = 'image/jpeg';
			else data = originalData;
			console.log(image.name, original, '->', data.length);
		}
		// Reuse identical texture bytes, while leaving geometry buffer views intact.
		const hash = image ? createHash('sha256').update(data).digest('hex') : null;
		if (hash && seenImages.has(hash)) {
			Object.assign(view, seenImages.get(hash));
			continue;
		}
		const pad = paddingLength(offset);
		if (pad) {
			chunks.push(Buffer.alloc(pad));
			offset += pad;
		}
		view.byteOffset = offset;
		view.byteLength = data.length;
		chunks.push(data);
		offset += data.length;
		if (hash) seenImages.set(hash, { byteOffset: view.byteOffset, byteLength: view.byteLength });
	}
	const pad = paddingLength(offset);
	chunks.push(Buffer.alloc(pad));
	offset += pad;
	gltf.buffers[0].byteLength = offset;
	let json = Buffer.from(JSON.stringify(gltf));
	json = Buffer.concat([json, Buffer.alloc(paddingLength(json.length), 32)]);
	const binary = Buffer.concat(chunks);
	// GLB v2: file header, JSON chunk header, JSON, BIN chunk header, binary.
	const header = Buffer.alloc(20);
	header.writeUInt32LE(0x46546c67);
	header.writeUInt32LE(2, 4);
	header.writeUInt32LE(28 + json.length + binary.length, 8);
	header.writeUInt32LE(json.length, 12);
	header.writeUInt32LE(0x4e4f534a, 16);
	const binaryHeader = Buffer.alloc(8);
	binaryHeader.writeUInt32LE(binary.length);
	binaryHeader.writeUInt32LE(0x004e4942, 4);
	const output = Buffer.concat([header, json, binaryHeader, binary]);
	await fs.writeFile(MODEL_OUTPUT, output);
	console.log('GLB', source.length, '->', output.length);
}

// Box-filter linear radiance rather than encoded RGBE bytes to preserve lighting.
async function optimizeSky() {
	const hdrFile = await fs.readFile(SKY_SOURCE);
	const hdr = new HDRLoader()
		.setDataType(FloatType)
		.parse(hdrFile.buffer.slice(hdrFile.byteOffset, hdrFile.byteOffset + hdrFile.byteLength));
	const width = 1024;
	const height = 512;
	const factor = hdr.width / width;
	if (!Number.isInteger(factor) || hdr.height / factor !== height)
		throw new Error('Unexpected HDR dimensions');
	const scanlines = [
		Buffer.from('#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ' + height + ' +X ' + width + '\n'),
	];
	for (let y = 0; y < height; y++) {
		const row = Buffer.alloc(width * 4);
		for (let x = 0; x < width; x++) {
			const color = [0, 0, 0];
			for (let dy = 0; dy < factor; dy++)
				for (let dx = 0; dx < factor; dx++) {
					const i = ((y * factor + dy) * hdr.width + x * factor + dx) * 4;
					for (let k = 0; k < 3; k++) color[k] += hdr.data[i + k] / (factor * factor);
				}
			// RGBE stores three color bytes and a shared base-two exponent.
			const max = Math.max(...color);
			const exponent = max > 1e-32 ? Math.floor(Math.log2(max)) + 1 : 0;
			const scale = max > 1e-32 ? 256 / 2 ** exponent : 0;
			for (let k = 0; k < 3; k++) row[k * width + x] = Math.min(255, Math.floor(color[k] * scale));
			row[3 * width + x] = max > 1e-32 ? exponent + 128 : 0;
		}
		// Radiance scanlines encode each R/G/B/exponent channel separately.
		// Runs of four or more equal bytes are compressed; others stay literal.
		scanlines.push(Buffer.from([2, 2, width >> 8, width & 255]));
		for (let k = 0; k < 4; k++) {
			const channel = row.subarray(k * width, (k + 1) * width);
			let x = 0;
			while (x < width) {
				let run = 1;
				while (x + run < width && run < 127 && channel[x + run] === channel[x]) run++;
				if (run >= 4) {
					scanlines.push(Buffer.from([128 + run, channel[x]]));
					x += run;
				} else {
					const start = x;
					x += run;
					while (x < width && x - start < 128) {
						let nextRun = 1;
						while (x + nextRun < width && nextRun < 4 && channel[x + nextRun] === channel[x])
							nextRun++;
						if (nextRun >= 4) break;
						x++;
					}
					scanlines.push(Buffer.from([x - start]), channel.subarray(start, x));
				}
			}
		}
	}
	const sky = Buffer.concat(scanlines);
	await fs.writeFile(SKY_OUTPUT, sky);
	const check = new HDRLoader()
		.setDataType(FloatType)
		.parse(sky.buffer.slice(sky.byteOffset, sky.byteOffset + sky.byteLength));
	console.log('HDR', hdrFile.length, '->', sky.length, 'verified', check.width, check.height);
}

await optimizeModel();
await optimizeSky();
