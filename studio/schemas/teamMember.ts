import { defineField, defineType } from "sanity"

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Job Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "phone", title: "Phone (optional)", type: "string" }),
    defineField({ name: "avatar", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["available", "busy", "away", "offline"], layout: "radio" },
      initialValue: "available",
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
})
