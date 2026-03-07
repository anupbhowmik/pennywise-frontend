import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  LogOut,
  Wallet,
} from "lucide-react"
import { API_BASE_URL } from "@/App"
import { useApiRequest } from "@/hooks/useApiRequest"

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const profileResp = useApiRequest({
    url: `${API_BASE_URL}/v1/auth/user/profile`,
    method: "GET",
  })
  const userData = (profileResp?.data ?? undefined) as
    | { display_name?: string; email?: string }
    | undefined

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/scan-receipt", label: "Scan Receipt", icon: Receipt },
    { href: "/analytics", label: "Analytics", icon: PieChart },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar (Desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Wallet className="mr-2 h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight">
            PocketFlow
          </span>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <div className="mb-4 px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
                end
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </div>

        {/* Logout button at bottom of sidebar */}
        <div className="mt-auto border-t border-border p-4">
          <button
            onClick={() => {
              localStorage.removeItem("token")
              navigate("/login")
            }}
            className="flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
          <div className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">PocketFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm leading-none font-medium">
                {userData?.display_name}
              </span>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="sticky top-0 z-10 hidden h-16 items-center justify-between border-b border-border bg-card/50 px-8 backdrop-blur-sm md:flex">
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm leading-none font-medium">
                {userData?.display_name}
              </span>
              <span className="text-xs text-muted-foreground">
                {userData?.email}
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="mx-auto max-w-6xl space-y-8 pb-24 md:pb-12">
            {children}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="fixed right-0 bottom-0 left-0 z-20 flex h-16 justify-around border-t border-border bg-card md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex h-full flex-1 flex-col items-center justify-center text-xs font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
                end
              >
                <Icon className="mb-1 h-5 w-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </main>
    </div>
  )
}
