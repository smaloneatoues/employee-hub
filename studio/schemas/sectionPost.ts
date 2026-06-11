import { defineField, defineType } from "sanity"

export default defineType({
  name: "sectionPost",
  title: "Section Post",
  type: "document",
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Department News", value: "department-news" },
          { title: "Team Highlights", value: "team-highlights" },
          { title: "Trainings", value: "trainings" },
          { title: "OU News", value: "ou-news" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Publish Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author / Team", type: "string" }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short teaser shown on the section page list",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Post Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    { title: "Newest First", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Section", name: "sectionAsc", by: [{ field: "section", direction: "asc" }, { field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", section: "section", date: "publishedAt" },
    prepare({ title, section, date }) {
      return { title, subtitle: `${section ?? ""} · ${date ?? ""}` }
    },
  },
})
