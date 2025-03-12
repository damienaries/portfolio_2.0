import { createClient } from '@sanity/client';

export default createClient({
	projectId: '04uxg7wm',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2021-09-21',
});
