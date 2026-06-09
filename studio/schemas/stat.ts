import { defineField, defineType } from "sanity"

export default defineType({
  name: "stat",
  title: "Stat / KPI",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Label (e.g. Total Employees)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value (e.g. 1,284)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "change", title: "Change text (e.g. +12 this month)", type: "string" }),
    defineField({ name: "changePositive", title: "Change is positive (green)", type: "boolean", initialValue: true }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "People / Employees", value: "Users" },
          { title: "Trending Up", value: "TrendingUp" },
          { title: "Award / Tenure", value: "Award" },
          { title: "Clock / Hours", value: "Clock" },
          { title: "Dollar / Finance", value: "DollarSign" },
          { title: "Chart", value: "BarChart2" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "value" },
  },
})
