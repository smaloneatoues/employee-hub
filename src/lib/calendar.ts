function escapeIcsText(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

function icsDate(iso: string, offsetDays = 0) {
  const d = new Date(iso + "T00:00:00")
  d.setDate(d.getDate() + offsetDays)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
}

interface CalendarEvent {
  id: string
  title: string
  isoDate: string
  time?: string
  location?: string
  description?: string
}

/** Build an all-day .ics file for the event and trigger a download. */
export function downloadCalendarEvent(event: CalendarEvent) {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`

  const details = [event.time, event.description].filter(Boolean).join(" — ")

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OUES Helio//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@oues-helio`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(event.isoDate)}`,
    `DTEND;VALUE=DATE:${icsDate(event.isoDate, 1)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : "",
    details ? `DESCRIPTION:${escapeIcsText(details)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean)

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${event.title.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").toLowerCase()}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
