import type { LucideIcon } from "lucide-react"
import { ExternalLink } from "lucide-react"

interface QuickLinkCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  iconBg?: string
  logoSrc?: string
}

export function QuickLinkCard({
  title,
  href,
  icon: Icon,
  iconBg = "bg-accent",
  logoSrc,
}: QuickLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 rounded-2xl border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
    >
      {logoSrc ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-white p-1.5">
          <img src={logoSrc} alt="" className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className={`rounded-xl p-2.5 ${iconBg} shrink-0 text-accent-foreground`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  )
}
