import { useMemo, useState } from "react"
import { ExternalLink, FileText, FolderOpen, Pin, Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ErrorState } from "@/components/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { getCompanyDocuments } from "@/lib/queries"
import { useQuery } from "@/lib/use-query"
import { usePageTitle } from "@/lib/use-page-title"
import { formatNewsletterDate } from "@/lib/dates"

export default function DocumentsPage() {
  const { data: docs, loading, error, retry } = useQuery(getCompanyDocuments)
  usePageTitle("Company Documents")
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")

  const categories = useMemo(() => {
    const present = [...new Set((docs ?? []).map((d) => d.category))]
    return ["All", ...present]
  }, [docs])

  const filtered = (docs ?? []).filter((d) => {
    const matchesCategory = category === "All" || d.category === category
    const q = search.trim().toLowerCase()
    const matchesSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      (d.description ?? "").toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Helio", to: "/" }, { label: "Company Documents" }]} />

        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-xl bg-accent p-3 text-accent-foreground">
            <FolderOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Company Documents</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Policies, forms, and guides — all in one place.
            </p>
          </div>
        </div>

        {error ? (
          <ErrorState onRetry={retry} />
        ) : loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : (docs ?? []).length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            The library is being stocked — check back soon.
          </p>
        ) : (
          <>
            {/* Search + category filters */}
            <div className="mb-6 flex flex-col gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search documents…"
                  className="w-full rounded-xl border bg-card py-2.5 pl-9 pr-3 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm transition-colors ${
                      category === c
                        ? "bg-primary font-medium text-primary-foreground"
                        : "border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-10 text-center">
                No documents match your search.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {filtered.map((doc) => (
                  <a
                    key={doc._id}
                    href={doc.fileUrl ?? doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="shrink-0 rounded-xl bg-accent p-2.5 text-accent-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{doc.title}</p>
                        {doc.pinned && <Pin className="h-3.5 w-3.5 shrink-0 text-primary" />}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {doc.category}
                        {doc.description ? ` · ${doc.description}` : ""}
                        {doc.lastUpdated ? ` · Updated ${formatNewsletterDate(doc.lastUpdated)}` : ""}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
