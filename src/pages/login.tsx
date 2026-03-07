import { useState } from "react"
import { Receipt, Loader2 } from "lucide-react"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AUTH_VERIFY_ENDPOINT = "/auth/google"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const verifyCredentials = async (credential: string) => {
    setLoading(true)
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${AUTH_VERIFY_ENDPOINT}`,
      { token: credential }
    )

    setLoading(false)

    console.log("resp data:", response.data)

    if (response?.data?.google_id) {
      navigate("/")
    }
  }

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    if (!credentialResponse.credential) {
      return
    }

    console.log("Received Google credential response:", credentialResponse)

    // save in local storage
    localStorage.setItem("token", credentialResponse.credential)

    await verifyCredentials(credentialResponse.credential)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md animate-in duration-500 fade-in slide-in-from-bottom-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Receipt className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your Receipt Processor account
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error("Google Sign-In failed")
              localStorage.removeItem("token")
            }}
            auto_select={true}
          />
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying session...
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
