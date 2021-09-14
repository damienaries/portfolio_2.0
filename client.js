import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: '04uxg7wm',
    dataset: 'production',
    useCdn: true,
})