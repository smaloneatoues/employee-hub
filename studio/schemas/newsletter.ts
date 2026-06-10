import { defineField, defineType } from "sanity"

export default defineType({
  name: "newsletter",
  title: "Management Newsletter",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Edition Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "From", type: "string", description: "e.g. OUES Leadership Team" }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short teaser shown on the dashboard and newsletter list",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Newsletter Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
})
