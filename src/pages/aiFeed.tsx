import { API_BASE_URL } from "@/App"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useApiRequest } from "@/hooks/useApiRequest"
import {
  ArrowRight,
  BadgeDollarSign,
  Calendar,
  Fuel,
  Package,
  Sparkles,
  Store,
  ChevronDown,
  Loader2,
} from "lucide-react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type FeedType = "transaction_summary" | "price_comparison"

type FeedItem = {
  type: FeedType
  title: string
  desc: string
  product: string | null
  current_store: string | null
  current_price: number | null
  suggested_store: string | null
  suggested_price: number | null
  saving: number | null
  merchant: string | null
  total: number | null
  item_count: number | null
  top_items: string[]
  purchase_date: string | null
}

type FeedResponse = {
  feeds: FeedItem[]
  count: number
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const formatMoney = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "-"
  return moneyFormatter.format(value)
}

const formatPurchaseDate = (value: string | null) => {
  if (!value) return "-"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

function TransactionSummaryCard({ item }: { item: FeedItem }) {
  return (
    <Card className="glass-panel relative overflow-hidden border-primary/20 shadow-sm">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <CardHeader className="space-y-3 p-5 pb-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Fuel className="h-3.5 w-3.5" />
          Transaction Summary
        </div>
        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {item.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-background/70 p-3">
            <p className="mb-1 text-xs text-muted-foreground">Merchant</p>
            <p className="line-clamp-1 text-sm font-semibold">
              {item.merchant || "-"}
            </p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/70 p-3">
            <p className="mb-1 text-xs text-muted-foreground">Total Spent</p>
            <p className="text-sm font-semibold">{formatMoney(item.total)}</p>
          </div>
          <div className="rounded-lg border border-border/70 bg-background/70 p-3">
            <p className="mb-1 text-xs text-muted-foreground">Items</p>
            <p className="text-sm font-semibold">{item.item_count ?? "-"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Purchased on {formatPurchaseDate(item.purchase_date)}
        </div>

        {item.top_items.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Top items in receipt
            </p>
            <div className="flex flex-wrap gap-2">
              {item.top_items.map((topItem) => (
                <span
                  key={topItem}
                  className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary"
                >
                  {topItem}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PriceComparisonCard({ item }: { item: FeedItem }) {
  return (
    <Card className="relative overflow-hidden border-emerald-700/20 bg-linear-to-br from-emerald-500/10 via-card to-card shadow-sm">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
      <CardHeader className="space-y-3 p-5 pb-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <BadgeDollarSign className="h-3.5 w-3.5" />
          Price Comparison
        </div>
        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {item.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        <div className="rounded-lg border border-border/70 bg-background/70 p-3">
          <p className="mb-1 text-xs text-muted-foreground">Product</p>
          <p className="text-sm font-semibold capitalize">
            {item.product || "-"}
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-lg border border-border/70 bg-background/70 p-3">
            <p className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Store className="h-3.5 w-3.5" />
              Current Store
            </p>
            <p className="text-sm font-semibold">{item.current_store || "-"}</p>
            <p className="text-sm text-muted-foreground">
              {formatMoney(item.current_price)}
            </p>
          </div>

          <div className="hidden md:flex md:justify-center">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="rounded-lg border border-emerald-700/30 bg-emerald-500/10 p-3">
            <p className="mb-1 flex items-center gap-1 text-xs text-emerald-700/90 dark:text-emerald-300/90">
              <Sparkles className="h-3.5 w-3.5" />
              Suggested Store
            </p>
            <p className="text-sm font-semibold">
              {item.suggested_store || "-"}
            </p>
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              {formatMoney(item.suggested_price)}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-700/30 bg-emerald-500/10 p-3">
          <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
            Potential savings per purchase
          </p>
          <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
            {formatMoney(item.saving)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AiFeedPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const selectedDay = searchParams.get("day") || "7"
  const [pendingDay, setPendingDay] = useState<string | null>(null)

  const handleDayChange = (day: string) => {
    if (day === selectedDay) return

    setPendingDay(day)
    // Update URL with new day parameter
    navigate(`?day=${day}`, { replace: true })
  }

  const { data, dataLoading, error } = useApiRequest({
    url: `${API_BASE_URL}/v1/feed?days=${selectedDay}`,
    method: "GET",
  })

  const feedData = (data as FeedResponse | null) || { feeds: [], count: 0 }
  const feeds = feedData.feeds || []

  const dayOptions = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 14 days", value: "14" },
    { label: "Last 30 days", value: "30" },
  ]
  const isDayChanging = dataLoading && pendingDay === selectedDay

  return (
    <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
      <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-background p-5 md:p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              AI Feed
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Personalized transaction summaries and smart price comparisons.
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2"
                disabled={isDayChanging}
              >
                {isDayChanging ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
                {isDayChanging
                  ? "Updating..."
                  : dayOptions.find((opt) => opt.value === selectedDay)
                      ?.label || "Select period"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={selectedDay}
                onValueChange={handleDayChange}
              >
                {dayOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Package className="h-3.5 w-3.5" />
          {feedData.count || feeds.length} insight
          {(feedData.count || feeds.length) === 1 ? "" : "s"}
        </div>
      </div>

      {dataLoading && (
        <div className="text-sm text-muted-foreground">Loading AI feed...</div>
      )}
      {error && (
        <div className="text-sm text-destructive">Failed to load AI feed.</div>
      )}

      {!dataLoading && !error && feeds.length === 0 && (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            No feed items available yet.
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {feeds.map((item, index) => {
          const key = `${item.type}-${item.title}-${index}`

          if (item.type === "price_comparison") {
            return <PriceComparisonCard key={key} item={item} />
          }

          if (item.type === "transaction_summary") {
            return <TransactionSummaryCard key={key} item={item} />
          }

          return null
        })}
      </div>
    </div>
  )
}
