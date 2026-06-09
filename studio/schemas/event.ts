import { defineField, defineType } from "sanity"

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "time", title: "Time (e.g. 10:00 – 11:30 AM)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Company", "Learning", "Social", "Wellbeing", "IT", "Finance", "HR"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description (optional)", type: "text", rows: 3 }),
  ],
  orderings: [{ title: "Date (soonest first)", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
})
