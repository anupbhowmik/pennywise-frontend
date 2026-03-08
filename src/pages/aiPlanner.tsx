import { API_BASE_URL } from "@/App"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useApiRequest } from "@/hooks/useApiRequest"
import { Sparkles, Send, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type PlanSession = {
  id: string
  title: string
  messages: Message[]
  created_at: string
}

export default function AiPlannerPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px"
    }
  }, [input])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // api call here
  }

  const handleClearChat = () => {
    setMessages([])
    toast.success("Chat cleared")
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">AI Planner</h1>
        </div>
        <p className="text-muted-foreground">
          Chat with AI to get personalized financial planning advice
        </p>
      </div>

      {/* Chat Container */}
      <Card className="flex h-[600px] flex-col border-primary/20 shadow-sm">
        <CardHeader className="border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="text-lg">Planning Assistant</CardTitle>
          <CardDescription>
            {messages.length === 0
              ? "Start a conversation to get financial planning insights"
              : `${messages.length} messages in this chat`}
          </CardDescription>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="inline-block rounded-full bg-primary/10 p-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <p className="max-w-xs text-muted-foreground">
                  Start a conversation by asking about budgeting, saving
                  strategies, or financial goals
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="mt-1 block text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </CardContent>

        {/* Input Area */}
        <div className="space-y-3 border-t border-primary/10 bg-gradient-to-r from-primary/5 to-transparent p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your finances..."
              className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              rows={1}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="self-end"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>

          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="w-full text-xs"
            >
              Clear Chat
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
