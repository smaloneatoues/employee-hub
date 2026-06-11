import { defineField, defineType } from "sanity"

export default defineType({
  name: "question",
  title: "Submitted Question",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "HR", value: "HR" },
          { title: "IT", value: "IT" },
          { title: "Management", value: "Management" },
          { title: "General", value: "General" },
        ],
      },
      initialValue: "General",
    }),
    defineField({
      name: "name",
      title: "Submitted By",
      type: "string",
      description: "Blank means the question was asked anonymously",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Review", value: "in-review" },
          { title: "Answered", value: "answered" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
  ],
  orderings: [
    { title: "Newest First", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "question", category: "category", status: "status" },
    prepare({ title, category, status }) {
      return { title, subtitle: `${category ?? "General"} · ${status ?? "new"}` }
    },
  },
})
