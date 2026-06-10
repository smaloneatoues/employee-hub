import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft, Laptop, Users, Building2, DollarSign, ShieldCheck,
  FileText, HelpCircle, BookOpen, Mail, Settings, ExternalLink,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { getSupportAreas, type SupportArea } from "@/lib/queries"

const ICON_MAP: Record<string, LucideIcon> = {
  Laptop, Users, Building2, DollarSign, ShieldCheck,
  FileText, HelpCircle, BookOpen, Mail, Settings,
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted ${className ?? ""}`} />
}

export default function SupportPage() {
  const [areas, setAreas] = useState<SupportArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSupportAreas().then((a) => {
      setAreas(a)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Helio
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">How can we help?</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a support area below and we'll get you to the right team.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36" />
            ))}
          </div>
        ) : areas.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            No support areas configured yet — add some in Sanity Studio.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => {
              const Icon = ICON_MAP[area.icon] ?? HelpCircle
              return (
                <a
                  key={area._id}
                  href={area.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 rounded-xl bg-primary p-6 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-white/15 p-2.5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-70" />
                  </div>
                  <div>
                    <p className="font-semibold">{area.title}</p>
                    <p className="mt-1 text-sm opacity-70">{area.description}</p>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
