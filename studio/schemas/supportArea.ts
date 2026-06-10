import { defineField, defineType } from "sanity"

export default defineType({
  name: "supportArea",
  title: "Support Area",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Short Description", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name",
      options: {
        list: [
          { title: "Laptop / IT", value: "Laptop" },
          { title: "Users / HR", value: "Users" },
          { title: "Building / Facilities", value: "Building2" },
          { title: "Dollar / Finance", value: "DollarSign" },
          { title: "Shield / Security", value: "ShieldCheck" },
          { title: "Document / Forms", value: "FileText" },
          { title: "Help / General", value: "HelpCircle" },
          { title: "Book / Training", value: "BookOpen" },
          { title: "Mail", value: "Mail" },
          { title: "Settings", value: "Settings" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
})
