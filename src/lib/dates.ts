export function formatNewsletterDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}
