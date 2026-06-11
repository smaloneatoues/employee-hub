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

export interface SupportArea {
  _id: string
  title: string
  description: string
  url: string
  icon: string
  order: number
}

export interface NewsletterListItem {
  _id: string
  title: string
  publishedAt: string
  author?: string
  summary: string
}

export interface Newsletter extends NewsletterListItem {
  body: unknown[]
}

export interface SectionPostListItem {
  _id: string
  title: string
  publishedAt: string
  author?: string
  summary: string
}

export interface SectionPost extends SectionPostListItem {
  section: string
  body: unknown[]
}

export interface CompanyDocument {
  _id: string
  title: string
  category: string
  description?: string
  url?: string
  fileUrl?: string
  pinned: boolean
  lastUpdated?: string
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

export async function getSupportAreas(): Promise<SupportArea[]> {
  return client.fetch(
    `*[_type == "supportArea"] | order(order asc) { _id, title, description, url, icon }`
  )
}

export async function getNewsletters(): Promise<NewsletterListItem[]> {
  return client.fetch(
    `*[_type == "newsletter"] | order(publishedAt desc) { _id, title, publishedAt, author, summary }`
  )
}

export async function getNewsletter(id: string): Promise<Newsletter | null> {
  return client.fetch(
    `*[_type == "newsletter" && _id == $id][0] { _id, title, publishedAt, author, summary, body }`,
    { id }
  )
}

export async function getLatestNewsletter(): Promise<NewsletterListItem | null> {
  return client.fetch(
    `*[_type == "newsletter"] | order(publishedAt desc)[0] { _id, title, publishedAt, author, summary }`
  )
}

export async function getSectionPosts(section: string): Promise<SectionPostListItem[]> {
  return client.fetch(
    `*[_type == "sectionPost" && section == $section] | order(publishedAt desc) { _id, title, publishedAt, author, summary }`,
    { section }
  )
}

export async function getSectionPost(id: string): Promise<SectionPost | null> {
  return client.fetch(
    `*[_type == "sectionPost" && _id == $id][0] { _id, title, publishedAt, author, summary, section, body }`,
    { id }
  )
}

export async function getCompanyDocuments(): Promise<CompanyDocument[]> {
  return client.fetch(
    `*[_type == "companyDocument"] | order(pinned desc, title asc) {
      _id, title, category, description, url, "fileUrl": file.asset->url, pinned, lastUpdated
    }`
  )
}

export async function getStats(): Promise<Stat[]> {
  return client.fetch(
    `*[_type == "stat"] | order(order asc) { _id, title, value, change, changePositive, icon }`
  )
}
