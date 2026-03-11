import { defineType, defineField } from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'price', type: 'number', validation: (r) => r.required().positive() }),
    defineField({ name: 'bedrooms', type: 'number', validation: (r) => r.required().min(0).integer() }),
    defineField({ name: 'bathrooms', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'sqft', type: 'number', title: 'Square feet', validation: (r) => r.min(0).integer() }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        defineField({ name: 'street', type: 'string' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'state', type: 'string' }),
        defineField({ name: 'zip', type: 'string' }),
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'status', type: 'string', options: { list: ['for_sale', 'sold', 'pending', 'off_market'] } }),
  ],
})
