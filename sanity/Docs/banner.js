export default {
  name: 'banner',
  title: 'banner',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt',
      title: 'Alt Image Description',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
  ],
}