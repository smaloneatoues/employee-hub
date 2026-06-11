import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { ErrorState } from "@/components/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { getNewsletters } from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { formatNewsletterDate } from "@/lib/dates"

export default function NewsletterPage() {
  const { data: editions, loading, error, retry } = useQuery(getNewsletters)

  const [latest, ...previous] = editions ?? []

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-4 -mx-2.5 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Helio
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Management Newsletter</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Updates from OUES leadership, published every other week.
          </p>
        </div>

        {error ? (
          <ErrorState onRetry={retry} />
        ) : loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-44" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : !latest ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            No editions published yet — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Latest edition — featured */}
            <Link
              to={`/newsletter/${latest._id}`}
              className="group flex flex-col gap-3 rounded-xl bg-primary p-6 text-primary-foreground transition-opacity hover:opacity-90"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-80">
                <Newspaper className="h-4 w-4" />
                Latest edition · {formatNewsletterDate(latest.publishedAt)}
              </div>
              <p className="text-xl font-semibold leading-snug">{latest.title}</p>
              <p className="text-sm opacity-80 line-clamp-3">{latest.summary}</p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium">
                Read this edition
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            {/* Previous editions */}
            {previous.length > 0 && (
              <section>
                <h2 className="mb-3 font-semibold">Previous editions</h2>
                <div className="flex flex-col gap-2">
                  {previous.map((n) => (
                    <Link
                      key={n._id}
                      to={`/newsletter/${n._id}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-accent/50"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {formatNewsletterDate(n.publishedAt)}
                          {n.author ? ` · ${n.author}` : ""}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
