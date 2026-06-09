import { defineField, defineType } from "sanity"

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author / Team", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Policy", "Event", "IT", "Wellbeing", "Finance", "HR", "General"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "important", title: "Mark as Important", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Date (newest first)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
})
