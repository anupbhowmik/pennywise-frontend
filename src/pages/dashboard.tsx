import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  mockInsights,
} from "@/lib/mock-data"
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your money today.
          </p>
        </div>
        <div className="flex gap-2">{/* Quick actions could go here */}</div>
      </div>

      {/* KPI Cards */}
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

      {/* AI Insights Sidebar */}
        <div className="col-span-1 space-y-6">
          <Card className="border-primary/20 shadow-sm bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
             <div className="absolute -right-4 -top-4 text-primary/10">
                <Sparkles size={120} />
             </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </div>
              <CardDescription>Based on your recent scanned receipts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 relative z-10">
              {mockInsights.map((insight) => (
                <div key={insight.id} className="p-4 rounded-xl bg-card border border-border/50 shadow-sm text-sm">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-1.5 shrink-0 ${
                      insight.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                      insight.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{insight.description}</p>
                      <button className="mt-3 text-xs font-medium text-primary hover:underline">
                        {insight.actionText} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      
    </div>
  )
}
