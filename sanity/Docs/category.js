export default {
  name: 'category',
  title: 'Category',
  type: 'document',
fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables the hotspot functionality for this image field
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Use the title field as the source for the slug
        maxLength: 96, // Maximum length of the slug
      },
    },
],
preview: {
    select: {
      title: 'title',
      media: 'image', // Use the image field as the preview media
    },
},
};