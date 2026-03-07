import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import Login from "@/pages/login"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/dashboard"
import Layout from "./components/layout"
import ProtectedRoute from "@/components/protected-route"

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
