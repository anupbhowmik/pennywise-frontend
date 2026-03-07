import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import Login from "@/pages/login"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/dashboard"
import Layout from "./components/layout"
import ProtectedRoute from "@/components/protected-route"
import ScanReceipt from "./pages/scanReceipt"
import AiFeedPage from "@/pages/aiFeed"

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
          <Route
            path="/scan-receipt"
            element={
              <ProtectedRoute>
                <Layout>
                  <ScanReceipt />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-feed"
            element={
              <ProtectedRoute>
                <Layout>
                  <AiFeedPage />
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
