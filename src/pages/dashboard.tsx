import { API_BASE_URL } from "@/App"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useApiRequest } from "@/hooks/useApiRequest"
import {
  CreditCard,
  DollarSign,
  Sparkles,
  TrendingUp,
  Info,
  AlertTriangle,
  Lightbulb,
  Receipt,
} from "lucide-react"
import { useState } from "react"

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

  const { data: summaryData } = useApiRequest({
    url: `${API_BASE_URL}/v1/dashboard/summary`,
    method: "GET",
  })

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const summaryCards = [
    {
      title: "Total Transactions",
      value: summaryData?.total_transactions,
      prefix: "",
      icon: DollarSign,
      iconClassName: "text-primary",
      iconWrapperClassName: "bg-primary/10",
      glowClassName: "bg-primary/10",
    },
    {
      title: "Total Spent",
      value: summaryData?.total_spent,
      prefix: "$",
      icon: CreditCard,
      iconClassName: "text-destructive",
      iconWrapperClassName: "bg-destructive/10",
      glowClassName: "bg-destructive/10",
    },
    {
      title: "Last Receipt Total",
      value: summaryData?.last_receipt_total,
      prefix: "$",
      icon: Receipt,
      iconClassName: "text-yellow-400",
      iconWrapperClassName: "bg-yellow-600/10",
      glowClassName: "bg-yellow-600/10",
    },
  ]

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

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
        {summaryCards.map((card) => {
          const Icon = card.icon

          return (
            <Card
              key={card.title}
              className="glass-panel relative min-w-46 shrink-0 overflow-hidden border border-primary shadow-sm md:min-w-0"
            >
              <div
                className={`pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full blur-3xl ${card.glowClassName}`}
              />
              <CardHeader className="flex flex-row items-center justify-between p-3 pb-1 md:pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground md:text-sm">
                  {card.title}
                </CardTitle>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full md:h-8 md:w-8 ${card.iconWrapperClassName}`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 md:h-4 md:w-4 ${card.iconClassName}`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
                <div className="font-display text-xl font-bold md:text-3xl">
                  {card.prefix}
                  {card.value}
                </div>
                <p className="mt-1 flex items-center text-xs text-muted-foreground">
                  from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
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
              Based on your recent financial activity, here are some insights
              and tips to help you manage your money better.
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
              let Icon = TrendingUp
              if (insight.type === "tip") Icon = Lightbulb
              else if (insight.type === "warning") Icon = AlertTriangle
              else if (insight.type === "trend") Icon = TrendingUp
              else if (insight.type === "info") Icon = Info

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
                        <div className="mt-3">
                          {expandedId === insight.id ? (
                            loadingId === insight.id ? (
                              <div className="flex items-center gap-2 text-sm text-primary">
                                <svg
                                  className="h-4 w-4 animate-spin"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                  />
                                </svg>
                                Loading AI suggestions...
                              </div>
                            ) : (
                              <div className="mt-2 flex w-fit flex-col">
                                <div className="rounded-lg bg-primary/10 px-2 py-1">
                                  <div className="mb-1 flex items-center gap-2 text-primary">
                                    <Sparkles className="h-4 w-4" />
                                    AI Suggestions
                                  </div>
                                </div>
                                <div className="mt-1 px-2 text-sm/6 text-muted-foreground">
                                  {insight.details}
                                </div>
                              </div>
                            )
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => {
                                setLoadingId(insight.id)
                                setExpandedId(insight.id)
                                setTimeout(() => setLoadingId(null), 2000)
                              }}
                            >
                              See More Details
                              <Sparkles className="ml-1 inline-block h-3 w-3 animate-pulse" />
                            </Button>
                          )}
                        </div>
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
