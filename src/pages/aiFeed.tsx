import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { mockInsights } from "@/lib/mock-data"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

const typeStyles: Record<
  string,
  { icon: React.ReactNode; ring: string; bg: string }
> = {
  warning: {
    icon: <AlertTriangle className="text-yellow-500" />,
    ring: "ring-yellow-300/60",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  info: {
    icon: <Info className="text-blue-500" />,
    ring: "ring-blue-300/60",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  success: {
    icon: <CheckCircle className="text-green-500" />,
    ring: "ring-green-300/60",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
}

export default function AiFeedPage() {
  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4 flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-bold">AI Feed</h1>
      {mockInsights.map((item) => {
        const style = typeStyles[item.type] || {}
        return (
          <Card key={item.id} className={`w-full shadow-none`}>
            <CardHeader className="relative p-6 pb-2">
              <div className="absolute top-7 left-6">{style.icon}</div>
              <div className="pl-10">
                <CardTitle className="mb-1 text-sm font-bold">
                  {item.title}
                </CardTitle>
                <CardDescription className="mb-5 text-sm leading-snug">
                  {item.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
