import type { LucideIcon } from "lucide-react"
import { ExternalLink } from "lucide-react"

interface QuickLinkCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  iconBg?: string
}

export function QuickLinkCard({
  title,
  description,
  href,
  icon: Icon,
  iconBg = "bg-primary/10",
}: QuickLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/40"
    >
      <div className={`rounded-lg p-2.5 ${iconBg} shrink-0`}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-sm truncate">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </a>
  )
}
