import { defineField, defineType } from "sanity"

export default defineType({
  name: "peopleUpdate",
  title: "People Update",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "New Employee", value: "new-hire" },
          { title: "Work Anniversary", value: "anniversary" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Start date for new employees, anniversary date for anniversaries",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "years",
      title: "Years",
      type: "number",
      description: "For anniversaries: how many years they're celebrating",
      hidden: ({ document }) => document?.kind !== "anniversary",
    }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
  ],
  orderings: [
    { title: "Newest First", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", kind: "kind", years: "years" },
    prepare({ title, kind, years }) {
      const label = kind === "anniversary" ? `Work anniversary${years ? ` · ${years} years` : ""}` : "New employee"
      return { title, subtitle: label }
    },
  },
})
