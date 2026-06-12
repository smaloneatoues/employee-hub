import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 -mx-2">
      <ol className="flex flex-wrap items-center text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className="rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="max-w-[55vw] truncate px-2 py-1.5 font-medium text-foreground sm:max-w-sm"
                >
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
