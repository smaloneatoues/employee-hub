import { useParams } from "react-router-dom"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { SiteHeader } from "@/components/site-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ErrorState } from "@/components/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { getNewsletter } from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { usePageTitle } from "@/lib/use-page-title"
import { urlFor } from "@/lib/sanity"
import { formatNewsletterDate } from "@/lib/dates"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-lg font-semibold tracking-tight">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-6 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-6 space-y-1">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1200).url()}
        alt=""
        className="my-6 w-full rounded-xl"
      />
    ),
  },
}

export default function NewsletterEditionPage() {
  const { id } = useParams<{ id: string }>()
  const { data: edition, loading, error, retry } = useQuery(
    () => (id ? getNewsletter(id) : Promise.resolve(null)),
    [id]
  )
  usePageTitle(edition?.title ?? "Newsletter")

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Helio", to: "/" },
            { label: "Newsletter", to: "/newsletter" },
            { label: edition?.title ?? "Edition" },
          ]}
        />

        {error ? (
          <ErrorState onRetry={retry} />
        ) : loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-64" />
          </div>
        ) : !edition ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            This edition could not be found.
          </p>
        ) : (
          <article>
            <header className="mb-8 border-b pb-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
                Management Newsletter
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">{edition.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatNewsletterDate(edition.publishedAt)}
                {edition.author ? ` · ${edition.author}` : ""}
              </p>
            </header>
            <div className="text-[15px] text-foreground">
              <PortableText value={edition.body as never} components={components} />
            </div>
          </article>
        )}
      </main>
    </div>
  )
}
