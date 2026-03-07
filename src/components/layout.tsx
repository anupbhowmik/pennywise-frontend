import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Receipt,
  Settings,
  LogOut,
  Wallet,
  User,
  Sparkles,
} from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { API_BASE_URL } from "@/App"
import { useApiRequest } from "@/hooks/useApiRequest"
import toast from "react-hot-toast"

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully!")
    navigate("/login")
  }

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
    { href: "/ai-feed", label: "AI Feed", icon: Sparkles },
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
            onClick={logout}
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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="flex items-center justify-center rounded-full p-2 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="User menu"
                >
                  <User className="h-6 w-6 text-primary" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                align="end"
                className="z-50 min-w-[180px] rounded-md border border-border bg-card p-2 shadow-lg focus:outline-none"
              >
                <div className="mb-1 border-b border-border px-2 py-1.5">
                  <div className="text-sm font-medium">
                    {userData?.display_name || "User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userData?.email}
                  </div>
                </div>
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm outline-none hover:bg-muted focus:bg-muted"
                  onSelect={() => navigate("/settings")}
                >
                  <Settings className="h-4 w-4" />
                  Profile & Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive outline-none hover:bg-destructive/10 focus:bg-destructive/10"
                  onSelect={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="User menu"
                >
                  <User className="h-6 w-6 text-primary" />
                  <span className="hidden text-sm font-medium md:inline">
                    {userData?.display_name || "User"}
                  </span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="z-50 min-w-[180px] rounded-md border border-border bg-card p-2 shadow-lg focus:outline-none"
              >
                <div className="mb-1 border-b border-border px-2 py-1.5">
                  <div className="text-sm font-medium">
                    {userData?.display_name || "User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userData?.email}
                  </div>
                </div>
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm outline-none hover:bg-muted focus:bg-muted"
                  onSelect={() => navigate("/settings")}
                >
                  <Settings className="h-4 w-4" />
                  Profile & Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-destructive outline-none hover:bg-destructive/10 focus:bg-destructive/10"
                  onSelect={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
