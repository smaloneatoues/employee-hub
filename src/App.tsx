import { Link as RouterLink } from "react-router-dom"
import { SiteHeader } from "@/components/site-header"
import { AnnouncementCard } from "@/components/announcement-card"
import { QuickLinkCard } from "@/components/quick-link-card"
import { EventCard } from "@/components/event-card"
import { ErrorState } from "@/components/error-state"
import { AskQuestionDialog } from "@/components/ask-question-dialog"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  HelpCircle, FileText, FolderOpen, Link,
  Newspaper, ArrowRight,
} from "lucide-react"
import { ICON_MAP } from "@/lib/icons"
import { SECTION_LIST } from "@/lib/sections"
import {
  getAnnouncements, getEvents, getPeopleUpdates, getQuickLinks, getLatestNewsletter,
  type PeopleUpdate,
} from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { urlFor } from "@/lib/sanity"

const QUICK_ACTIONS = [
  { label: "Submit a Request", description: "Budget, resource, or project", icon: FileText, href: "https://forms.office.com/Pages/ResponsePage.aspx?id=41uzNOLEIE2JwUQ51Znx2AF2zTeT8ghDrP5HnFxrtVZURjEyQlpWMFRDRTlOSTU3RUdJSElBWTlXMC4u", internal: false },
  { label: "OneDesk Support", description: "IT, Ops, and PMO", icon: HelpCircle, href: "https://oues.atlassian.net/servicedesk/customer/portals", internal: false },
  { label: "Company Documents", description: "Policies, forms, and guides", icon: FolderOpen, href: "/documents", internal: true },
]

const SECTION_TILES = SECTION_LIST

function formatEventDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return `${d.getDate()} ${d.toLocaleString("en-AU", { month: "short" })}`
}

function formatAnnouncementDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return `${d.toLocaleString("en-AU", { month: "short" })} ${d.getDate()}`
}

function formatPeopleDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}

function PersonRow({ person, meta }: { person: PeopleUpdate; meta: string }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-xs">
      {person.photo ? (
        <img
          src={urlFor(person.photo).width(80).height(80).url()}
          alt={person.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{person.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {[person.role, person.department].filter(Boolean).join(" · ") || meta}
        </p>
        {(person.role || person.department) && (
          <p className="truncate text-xs text-muted-foreground/80">{meta}</p>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const { data, loading, error, retry } = useQuery(() =>
    Promise.all([
      getAnnouncements(),
      getEvents(),
      getPeopleUpdates(),
      getQuickLinks(),
      getLatestNewsletter(),
    ])
  )
  const announcements = data?.[0] ?? []
  const events = data?.[1] ?? []
  const peopleUpdates = data?.[2] ?? []
  const quickLinks = data?.[3] ?? []
  const latestNewsletter = data?.[4] ?? null
  const newHires = peopleUpdates.filter((p) => p.kind === "new-hire")
  const anniversaries = peopleUpdates.filter((p) => p.kind === "anniversary")

  const now = new Date()
  const hour = now.getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {today}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{greeting}</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Here's what's happening across OUES today.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => {
            const cardClass =
              "flex items-start gap-3.5 rounded-2xl bg-primary p-5 text-primary-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
            const inner = (
              <>
                <div className="rounded-lg bg-white/15 p-2">
                  <action.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{action.label}</p>
                  <p className="mt-1 text-xs opacity-70">{action.description}</p>
                </div>
              </>
            )
            return action.internal ? (
              <RouterLink key={action.label} to={action.href} className={cardClass}>
                {inner}
              </RouterLink>
            ) : (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            )
          })}
          <AskQuestionDialog />
        </div>

        {error ? (
          <ErrorState onRetry={retry} />
        ) : (
          <>
            {/* Section tiles */}
            <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {SECTION_TILES.map((tile) => (
                <RouterLink
                  key={tile.slug}
                  to={`/sections/${tile.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-accent p-2.5 text-accent-foreground">
                      <tile.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold leading-tight">{tile.title}</p>
                    <p className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:block">
                      {tile.description}
                    </p>
                  </div>
                </RouterLink>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Left column */}
              <div className="md:col-span-2 flex flex-col gap-6">
                {/* Latest management newsletter */}
                {!loading && latestNewsletter && (
                  <RouterLink
                    to={`/newsletter/${latestNewsletter._id}`}
                    className="group flex flex-col gap-2 rounded-2xl border-2 border-primary/20 bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
                      <Newspaper className="h-4 w-4" />
                      Management Newsletter ·{" "}
                      {new Date(latestNewsletter.publishedAt + "T00:00:00").toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <p className="font-heading text-lg font-semibold leading-snug">{latestNewsletter.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{latestNewsletter.summary}</p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read the latest edition
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </RouterLink>
                )}

                <section>
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">Announcements</h2>
                  {loading ? (
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
                    </div>
                  ) : announcements.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">All quiet for now — check back soon.</p>
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
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">Upcoming Events</h2>
                  {loading ? (
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
                    </div>
                  ) : events.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">Nothing on the calendar just yet.</p>
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
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">Quick Links</h2>
                  {loading ? (
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
                    </div>
                  ) : quickLinks.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">Links are on their way.</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {quickLinks.map((l) => (
                        <QuickLinkCard
                          key={l._id}
                          title={l.title}
                          description={l.description}
                          href={l.url}
                          icon={ICON_MAP[l.icon] ?? Link}
                          logoSrc={l.icon === "OU" ? "/ou-logo.png" : undefined}
                        />
                      ))}
                    </div>
                  )}
                </section>

                <Separator />

                <section>
                  <h2 className="mb-4 text-xl font-semibold tracking-tight">People</h2>
                  {loading ? (
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
                    </div>
                  ) : peopleUpdates.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      No new faces or milestones this week.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {newHires.length > 0 && (
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            New to OUES
                          </p>
                          <div className="flex flex-col gap-2">
                            {newHires.map((p) => (
                              <PersonRow key={p._id} person={p} meta={`Started ${formatPeopleDate(p.date)}`} />
                            ))}
                          </div>
                        </div>
                      )}
                      {anniversaries.length > 0 && (
                        <div>
                          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                            Work Anniversaries
                          </p>
                          <div className="flex flex-col gap-2">
                            {anniversaries.map((p) => (
                              <PersonRow
                                key={p._id}
                                person={p}
                                meta={`${p.years ? `${p.years} year${p.years === 1 ? "" : "s"} · ` : ""}${formatPeopleDate(p.date)}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
