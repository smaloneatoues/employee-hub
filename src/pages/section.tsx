import { Link, useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ErrorState } from "@/components/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { getSectionPosts } from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { usePageTitle } from "@/lib/use-page-title"
import { SECTIONS } from "@/lib/sections"
import { formatNewsletterDate } from "@/lib/dates"
import NotFoundPage from "./not-found"

export default function SectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const section = slug ? SECTIONS[slug] : undefined

  const { data: posts, loading, error, retry } = useQuery(
    () => (section ? getSectionPosts(section.slug) : Promise.resolve([])),
    [slug]
  )
  usePageTitle(section?.title)

  if (!section) return <NotFoundPage />
  const Icon = section.icon

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Helio", to: "/" }, { label: section.title }]} />

        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-xl bg-accent p-3 text-accent-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{section.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
          </div>
        </div>

        {error ? (
          <ErrorState onRetry={retry} />
        ) : loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            Nothing posted here yet — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/sections/${section.slug}/${post._id}`}
                className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-accent/50"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {formatNewsletterDate(post.publishedAt)}
                    {post.author ? ` · ${post.author}` : ""}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold leading-snug">{post.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
