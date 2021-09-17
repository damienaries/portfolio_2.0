export default {
    name: 'job',
    title: 'Job',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
          name: 'company',
          title: 'Company',
          type: 'string',
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{type: 'reference', to: {type: 'category'}}],
      },
      {
          name: 'technologies',
          title: 'Technologies',
          type: 'array',
          of: [{type: 'reference', to: {type: 'technology'}}],
      },
      {
          name: 'from',
          title: 'From',
          type: 'string',
      },
      {
        name: 'to',
        title: 'To',
        type: 'string',
        },
      {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      },
    ],
}
  