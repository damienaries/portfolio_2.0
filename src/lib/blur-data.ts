/**
 * Blur placeholders, one per image in public/images. next/image only derives
 * these automatically from static imports, and ours come from JSON paths.
 *
 * Generated — regenerate when the source images change.
 */
export const BLUR: Record<string, string> = {
	'/images/carey-corea.webp': 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAQBACdASoUAAsAPt1cpkyopSOiMAgBEBuJZQCsMoADTrkt+7y4QJQfwAD+4ewcBSRA1ktcg4DTUqlvwDZO75E0gRnCCNRyhdaph1YtB4CEHPW4sA9k3oyIp1UoY+8kSO7mza8gSxnv2xv7GxU7OKOQQeNJoKGwQAA=',
	'/images/concept.webp': 'data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABQBACdASoUAA0APt1cpkyopSOiMAgBEBuJYgCdL11s/wHmZXTb1fFOZ7SQAP7tqMjAHo8tM2odFzp2EtrXSxPXbUOzoa8aJztkos2KFCQeAyANKVUgAA==',
	'/images/corea-creative.webp': 'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABQAwCdASoUAAoAPt1cpkyopSOiMAgBEBuJaQAASoiRnUywAAD+9J4PewUruu7MJq3pMmdQk0+mY2aBKntsiMdjLeuhSKZnAhAAAA==',
	'/images/find-unused-images.webp': 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAABQAwCdASoUAAsAPt1apkyopSOiMAgBEBuJYwC7AB7HmR6PAAD+7qHlAps4FV+5VgXVQAAA',
	'/images/habit-tracker.webp': 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAgCdASoUABAAPt1cpkyopSOiMAgBEBuJaQAAeyAA/vDykgx0w4AA',
	'/images/ivisa.webp': 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwAwCdASoUAAwAPt1apkyopSOiMAgBEBuJYwAAW+mg93sw9EwWv/IAAP7tg0m1MlMe81u5sCeq0qfKaEbsXPLy1u6UkweuakuaKqIE/o0zPV43FqdIvnleRscUGhdDC7p3ZRzfwjLZHmTw52eFIAAA',
	'/images/judi-boisson.webp': 'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQBACdASoUAAwAPt1cpkyopSOiMAgBEBuJbACdIExDAcmw3SuSGpA8qAD+3yntsk4tj4oxqmMS9ivNAMFz3875hVlCl8wT2UeMn+pk030AimLnPQpoEN+Hc5jMrqcSGG6OfOQVoFAAAA==',
	'/images/landing-poster.webp': 'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAA0APt1cp0yopSOiMAgBEBuJQBOmUABWtZY203XZQIAA/rWrUVYhR2MOir7B0KmNzWDd5zkfFR7OMtYt4ikKPeTYVfFHcuMIQdvoSPRgVAAA',
	'/images/leader-institute.webp': 'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAwCdASoUAAwAPt1cpkyopSOiMAgBEBuJZwCw7B6JIMMq4tqQgAD7zEZpO1fFRIsWdEbxXCC68T+7xXnIQZuqtLgmc1lFGoAAAA==',
	'/images/swizzle.webp': 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABQAwCdASoUAAwAPt1apkyopSOiMAgBEBuJZwC2yDJ8NKGt9AD+8FxisO+At1IsMfpAJF8rxvpqzex26VaC29RUGzAAAA==',
};

export const blurFor = (src?: string) => (src ? BLUR[src] : undefined);
