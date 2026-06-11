import { defineField, defineType } from "sanity"

export default defineType({
  name: "quickLink",
  title: "Quick Link",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Short Description", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name (e.g. Calendar, BookOpen, HelpCircle, FileText, ShieldCheck, Laptop)",
      options: {
        list: [
          { title: "OU Logo", value: "OU" },
          { title: "Calendar", value: "Calendar" },
          { title: "Book (Learning)", value: "BookOpen" },
          { title: "Help / Support", value: "HelpCircle" },
          { title: "Document / Policies", value: "FileText" },
          { title: "Shield (Compliance)", value: "ShieldCheck" },
          { title: "Laptop / Equipment", value: "Laptop" },
          { title: "Users", value: "Users" },
          { title: "Mail", value: "Mail" },
          { title: "Settings", value: "Settings" },
          { title: "Link", value: "Link" },
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
