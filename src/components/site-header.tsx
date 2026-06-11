import { Link, NavLink } from "react-router-dom"

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "Documents", to: "/documents" },
  { label: "Support", to: "/support" },
]

function NavPills({ className }: { className?: string }) {
  return (
    <nav className={className}>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
              isActive
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-heading text-base font-bold text-primary-foreground">
                H
              </div>
              <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                OUES Helio
              </span>
            </Link>
            <NavPills className="hidden items-center gap-1 md:flex" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                SM
              </div>
              <span className="hidden sm:inline text-muted-foreground">Sean Malone</span>
            </div>
          </div>
        </div>
        {/* Mobile nav — second row, scrollable */}
        <NavPills className="-mx-1 flex items-center gap-1 overflow-x-auto pb-3 md:hidden" />
      </div>
    </header>
  )
}
