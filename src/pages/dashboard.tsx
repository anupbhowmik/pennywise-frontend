import { API_BASE_URL } from "@/App"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useApiRequest } from "@/hooks/useApiRequest"
// import { mockInsights } from "@/lib/mock-data"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Target,
  Sparkles,
  TrendingUp,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react"

export default function Dashboard() {
  const { data, dataLoading, error } = useApiRequest({
    url: `${API_BASE_URL}/v1/insights`,
    method: "GET",
  })
  type Insight = {
    id: string
    title: string
    desc?: string
    description?: string
    details?: string
    type: "trend" | "tip" | "warning" | "info"
    severity: "info" | "warning" | "alert"
  }
  const insights: Insight[] = (data?.insights || []) as Insight[]

  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your money.
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="glass-panel relative overflow-hidden border-none shadow-sm">
          <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Balance
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold">$12,450.80</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="mr-1 flex items-center text-emerald-500">
                <ArrowUpRight className="mr-0.5 h-3 w-3" /> +2.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel relative overflow-hidden border-none shadow-sm">
          <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-destructive/10 blur-3xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent (Oct)
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
              <CreditCard className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold">$3,400.00</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="mr-1 flex items-center text-destructive">
                <ArrowUpRight className="mr-0.5 h-3 w-3" /> +12.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel relative overflow-hidden border-none shadow-sm">
          <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Savings Goal
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-display text-3xl font-bold">$1,200.00</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[65%] bg-blue-500" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              65% of $2,000 goal
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1 space-y-6">
        <Card className="relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 to-transparent shadow-sm">
          <div className="absolute -top-4 -right-4 text-primary/10">
            <Sparkles size={120} />
          </div>
          <CardHeader className="pb-2">
            <div className="mb-1 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Insights</CardTitle>
            </div>
            <CardDescription>
              Based on your recent financial activity, here are some insights and tips to help you manage your money better.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4 pt-4">
            {dataLoading && <div>Loading AI insights...</div>}
            {error && (
              <div className="text-destructive">Failed to load insights.</div>
            )}
            {insights.length === 0 && !dataLoading && !error && (
              <div className="text-muted-foreground">
                No insights available.
              </div>
            )}
            {insights.map((insight) => {
              // Icon selection based on type
              let Icon = TrendingUp
              if (insight.type === "tip") Icon = Lightbulb
              else if (insight.type === "warning") Icon = AlertTriangle
              else if (insight.type === "trend") Icon = TrendingUp
              else if (insight.type === "info") Icon = Info

              // Color selection based on severity
              let colorClass = "bg-blue-500/10 text-blue-500"
              if (insight.severity === "alert")
                colorClass = "bg-destructive/20 text-destructive"
              else if (insight.severity === "warning")
                colorClass = "bg-amber-500/10 text-amber-500"
              else if (insight.severity === "info")
                colorClass = "bg-blue-500/10 text-blue-500"

              return (
                <div
                  key={insight.id}
                  className="rounded-xl border border-border/50 bg-card p-4 text-sm shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 shrink-0 rounded-full p-1.5 ${colorClass}`}
                    >
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">
                        {insight.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {insight.desc}
                      </p>
                      {insight.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-xs text-primary underline">
                            Details
                          </summary>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {insight.details}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
