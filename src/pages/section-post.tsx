import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { ErrorState } from "@/components/error-state"
import { PortableTextBody } from "@/components/portable-text-body"
import { Skeleton } from "@/components/ui/skeleton"
import { getSectionPost } from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { SECTIONS } from "@/lib/sections"
import { formatNewsletterDate } from "@/lib/dates"
import NotFoundPage from "./not-found"

export default function SectionPostPage() {
  const { slug, id } = useParams<{ slug: string; id: string }>()
  const section = slug ? SECTIONS[slug] : undefined

  const { data: post, loading, error, retry } = useQuery(
    () => (id ? getSectionPost(id) : Promise.resolve(null)),
    [id]
  )

  if (!section) return <NotFoundPage />

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to={`/sections/${section.slug}`}
          className="mb-6 -mx-2.5 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All {section.title}
        </Link>

        {error ? (
          <ErrorState onRetry={retry} />
        ) : loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-64" />
          </div>
        ) : !post ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            This post could not be found.
          </p>
        ) : (
          <article>
            <header className="mb-8 border-b pb-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
                {section.title}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatNewsletterDate(post.publishedAt)}
                {post.author ? ` · ${post.author}` : ""}
              </p>
            </header>
            <PortableTextBody value={post.body} />
          </article>
        )}
      </main>
    </div>
  )
}
