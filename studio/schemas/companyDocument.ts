import { defineField, defineType } from "sanity"

export default defineType({
  name: "companyDocument",
  title: "Company Document",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Policies", value: "Policies" },
          { title: "Forms", value: "Forms" },
          { title: "Handbook", value: "Handbook" },
          { title: "Benefits", value: "Benefits" },
          { title: "IT", value: "IT" },
          { title: "Other", value: "Other" },
        ],
      },
      initialValue: "Other",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "One line on what this document is for",
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description: "Link to the document's home (SharePoint, Insperity, etc.). Preferred over uploading a copy.",
    }),
    defineField({
      name: "file",
      title: "File Upload",
      type: "file",
      description: "Only for standalone files that have no other home — linked documents stay up to date automatically.",
    }),
    defineField({
      name: "pinned",
      title: "Pinned",
      type: "boolean",
      description: "Pinned documents appear at the top of the Documents page",
      initialValue: false,
    }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date" }),
  ],
  validation: (r) =>
    r.custom((doc) => {
      const d = doc as { url?: string; file?: unknown } | undefined
      if (!d?.url && !d?.file) return "Add a link or upload a file so the document opens somewhere."
      return true
    }),
  orderings: [
    { title: "Category", name: "categoryAsc", by: [{ field: "category", direction: "asc" }, { field: "title", direction: "asc" }] },
    { title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", category: "category", pinned: "pinned" },
    prepare({ title, category, pinned }) {
      return { title: `${pinned ? "📌 " : ""}${title}`, subtitle: category }
    },
  },
})
