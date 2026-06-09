import { useEffect, useState } from "react"
import { StatsCard } from "@/components/stats-card"
import { AnnouncementCard } from "@/components/announcement-card"
import { TeamMemberCard } from "@/components/team-member-card"
import { QuickLinkCard } from "@/components/quick-link-card"
import { EventCard } from "@/components/event-card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LucideIcon } from "lucide-react"
import {
  Users, TrendingUp, Award, Clock, DollarSign, BarChart2,
  Calendar, BookOpen, HelpCircle, FileText, ShieldCheck, Laptop,
  Mail, Settings, Link, Bell,
} from "lucide-react"
import {
  getAnnouncements, getEvents, getTeamMembers, getQuickLinks, getStats,
  type Announcement, type Event, type TeamMember, type QuickLink, type Stat,
} from "@/lib/queries"
import { urlFor } from "@/lib/sanity"

const ICON_MAP: Record<string, LucideIcon> = {
  Users, TrendingUp, Award, Clock, DollarSign, BarChart2,
  Calendar, BookOpen, HelpCircle, FileText, ShieldCheck, Laptop,
  Mail, Settings, Link,
}

function formatEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return `${d.getDate()} ${d.toLocaleString("en-AU", { month: "short" })}`
}

function formatAnnouncementDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return `${d.toLocaleString("en-AU", { month: "short" })} ${d.getDate()}`
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted ${className ?? ""}`} />
}

export default function App() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  useEffect(() => {
    Promise.all([
      getAnnouncements(),
      getEvents(),
      getTeamMembers(),
      getQuickLinks(),
      getStats(),
    ]).then(([a, e, t, q, s]) => {
      setAnnouncements(a)
      setEvents(e)
      setTeamMembers(t)
      setQuickLinks(q)
      setStats(s)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                H
              </div>
              <span className="font-semibold text-sm text-foreground">OUES Helio</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                  SM
                </div>
                <span className="hidden sm:inline text-muted-foreground">Sean Malone</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening across OUES today.</p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Submit a Request", description: "Budget, resource, or project", icon: FileText, href: "https://forms.office.com/Pages/ResponsePage.aspx?id=41uzNOLEIE2JwUQ51Znx2AF2zTeT8ghDrP5HnFxrtVZURjEyQlpWMFRDRTlOSTU3RUdJSElBWTlXMC4u" },
            { label: "Request Time Off", description: "PTO and leave requests", icon: Calendar, href: "#" },
            { label: "OneDesk Support", description: "IT, HR, and facilities", icon: HelpCircle, href: "https://oues.atlassian.net/servicedesk/customer/portals" },
            { label: "Submit a Question", description: "Ask HR, IT, or management", icon: HelpCircle, href: "https://forms.office.com/Pages/ResponsePage.aspx?id=41uzNOLEIE2JwUQ51Znx2FzRvwcc_6xJj-43KcbQEExUMUExU0JCWktQVE9LOUpQWU8zWlI1UzdONy4u" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl bg-primary p-4 text-primary-foreground transition-opacity hover:opacity-90"
            >
              <action.icon className="mt-0.5 h-5 w-5 shrink-0 opacity-90" />
              <div>
                <p className="text-sm font-semibold leading-tight">{action.label}</p>
                <p className="mt-0.5 text-xs opacity-70">{action.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)
            : stats.length > 0
            ? stats.map((s) => (
                <StatsCard
                  key={s._id}
                  title={s.title}
                  value={s.value}
                  change={s.change ?? ""}
                  changePositive={s.changePositive}
                  icon={ICON_MAP[s.icon] ?? Users}
                />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <StatsCard key={i} title="" value="" change="" icon={Users} />
              ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Announcements</h2>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</button>
              </div>
              {loading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
                </div>
              ) : announcements.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">No announcements yet — add some in Sanity Studio.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {announcements.map((a) => (
                    <AnnouncementCard
                      key={a._id}
                      title={a.title}
                      body={a.body}
                      author={a.author}
                      category={a.category}
                      date={formatAnnouncementDate(a.date)}
                      important={a.important}
                    />
                  ))}
                </div>
              )}
            </section>

            <Separator />

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Upcoming Events</h2>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Full calendar</button>
              </div>
              {loading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
                </div>
              ) : events.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">No upcoming events — add some in Sanity Studio.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {events.map((e) => (
                    <EventCard
                      key={e._id}
                      title={e.title}
                      date={formatEventDate(e.date)}
                      time={e.time}
                      location={e.location}
                      category={e.category}
                      description={e.description}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="mb-3 font-semibold">Quick Links</h2>
              {loading ? (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
                </div>
              ) : quickLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">Add quick links in Sanity Studio.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {quickLinks.map((l) => (
                    <QuickLinkCard
                      key={l._id}
                      title={l.title}
                      description={l.description}
                      href={l.url}
                      icon={ICON_MAP[l.icon] ?? Link}
                    />
                  ))}
                </div>
              )}
            </section>

            <Separator />

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold">Team Directory</h2>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</button>
              </div>
              <Tabs defaultValue="all">
                <TabsList className="mb-3 w-full">
                  <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
                  <TabsTrigger value="available" className="flex-1 text-xs">Available</TabsTrigger>
                </TabsList>
                {["all", "available"].map((tab) => (
                  <TabsContent key={tab} value={tab}>
                    <ScrollArea className="h-[420px] pr-2">
                      {loading ? (
                        <div className="flex flex-col gap-2">
                          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {teamMembers
                            .filter((m) => tab === "all" || m.status === "available")
                            .map((m) => (
                              <TeamMemberCard
                                key={m._id}
                                name={m.name}
                                role={m.role}
                                department={m.department}
                                email={m.email}
                                phone={m.phone}
                                avatar={m.avatar ? urlFor(m.avatar).width(80).url() : undefined}
                                status={m.status}
                              />
                            ))}
                          {teamMembers.filter((m) => tab === "all" || m.status === "available").length === 0 && (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                              {tab === "available" ? "No one available right now." : "Add team members in Sanity Studio."}
                            </p>
                          )}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
