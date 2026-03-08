import { useState } from "react"
import {
  ArrowRight,
  Loader2,
  Receipt,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import type { CredentialResponse } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AUTH_VERIFY_ENDPOINT = "/v1/auth/google"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const verifyCredentials = async (credential: string) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${AUTH_VERIFY_ENDPOINT}`,
        { token: credential }
      )

      console.log("resp data:", response.data)

      if (response?.data?.access_token) {
        localStorage.setItem("token", response.data.access_token)
        toast.success("Login successful!")
        navigate("/")
      }
    } catch (error) {
      console.error("Error verifying credentials:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      return
    }

    try {
      console.log("Received Google credential response:", credentialResponse)
      await verifyCredentials(credentialResponse.credential)
    } catch (error) {
      console.error("Error during Google login:", error)
      localStorage.removeItem("token")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_18%,hsl(var(--primary)/0.24),transparent_42%),radial-gradient(circle_at_83%_28%,hsl(var(--primary)/0.12),transparent_42%),linear-gradient(160deg,hsl(var(--background)),hsl(var(--accent)/0.35))] px-4 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-size-[32px_32px] opacity-30 [background:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-stretch overflow-hidden rounded-3xl border border-white/60 bg-white/45 shadow-[0_30px_120px_-35px_hsl(var(--foreground)/0.28)] backdrop-blur-xl sm:min-h-[calc(100vh-5rem)] lg:grid-cols-2 dark:border-white/15 dark:bg-black/25">
        <section className="relative flex flex-col justify-between overflow-hidden border-b border-white/50 bg-linear-to-br from-primary/95 via-primary/80 to-emerald-500 p-7 text-primary-foreground sm:p-10 lg:border-r lg:border-b-0 dark:border-white/15">
          <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute right-10 -bottom-24 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />

          <div className="relative z-10 animate-in space-y-7 duration-700 fade-in slide-in-from-left-4">
            <div className="space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-inner ring-1 shadow-white/20 ring-white/35">
                <Receipt className="h-7 w-7" />
              </div>
              <h1 className="max-w-lg font-display text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
                Welcome to PennyWise.
                <span className="block text-emerald-100/95">
                  Track smarter. Stress less.
                </span>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-emerald-50/90 sm:text-base">
                Your AI finance companion turns receipts, spending patterns, and
                goals into clear daily guidance.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-10 grid gap-3 text-sm text-emerald-50/95 sm:mt-0">
            <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Bank-grade account protection and private sessions</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
              <ArrowRight className="h-4 w-4" />
              <span>Instant AI insights after every login</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white/75 p-6 sm:p-10 dark:bg-zinc-950/70">
          <div className="w-full max-w-md animate-in duration-700 zoom-in-95 fade-in">
            <div className="rounded-2xl border border-white/70 bg-white/90 p-6 backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-zinc-900/85">
              <div className="mb-8 space-y-3">
                <p className="text-xs font-semibold tracking-[0.16em] text-primary/80 uppercase dark:text-emerald-300/90">
                  Secure Sign In
                </p>
                <h2 className="font-display text-3xl leading-tight font-semibold text-slate-900 dark:text-zinc-100">
                  Continue to your dashboard
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  Sign in with Google to sync your finance profile, planner, and
                  receipts in one place.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <GoogleLogin
                  theme="filled_black"
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error("Google Sign-In failed")
                    localStorage.removeItem("token")
                  }}
                  auto_select={true}
                />
                {loading ? (
                  <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying your session...
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
