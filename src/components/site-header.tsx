import { Link } from "react-router-dom"
import { Bell } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              H
            </div>
            <span className="font-semibold text-sm text-foreground">OUES Helio</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                SM
              </div>
              <span className="hidden sm:inline text-muted-foreground">Sean Malone</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
