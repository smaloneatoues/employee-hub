import { Link, NavLink } from "react-router-dom"

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Newsletter", to: "/newsletter" },
  { label: "Support", to: "/support" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                H
              </div>
              <span className="font-semibold text-sm text-foreground">OUES Helio</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
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
      </div>
    </header>
  )
}
