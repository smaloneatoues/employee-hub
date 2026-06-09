import { client } from "./sanity"

export interface Announcement {
  _id: string
  title: string
  body: string
  author: string
  category: string
  date: string
  important: boolean
}

export interface Event {
  _id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  description?: string
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  department: string
  email: string
  phone?: string
  avatar?: { asset: { _ref: string } }
  status: "available" | "busy" | "away" | "offline"
}

export interface QuickLink {
  _id: string
  title: string
  description: string
  url: string
  icon: string
  order: number
}

export interface Stat {
  _id: string
  title: string
  value: string
  change?: string
  changePositive: boolean
  icon: string
  order: number
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return client.fetch(
    `*[_type == "announcement"] | order(date desc)[0...8] { _id, title, body, author, category, date, important }`
  )
}

export async function getEvents(): Promise<Event[]> {
  return client.fetch(
    `*[_type == "event" && date >= $today] | order(date asc)[0...6] { _id, title, date, time, location, category, description }`,
    { today: new Date().toISOString().slice(0, 10) }
  )
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc, name asc) { _id, name, role, department, email, phone, avatar, status }`
  )
}

export async function getQuickLinks(): Promise<QuickLink[]> {
  return client.fetch(
    `*[_type == "quickLink"] | order(order asc) { _id, title, description, url, icon }`
  )
}

export async function getStats(): Promise<Stat[]> {
  return client.fetch(
    `*[_type == "stat"] | order(order asc) { _id, title, value, change, changePositive, icon }`
  )
}
