import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import Login from "@/pages/login"
import { Toaster } from "react-hot-toast"

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
