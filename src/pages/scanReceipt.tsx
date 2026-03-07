import { useState, useRef } from "react"
import {
  UploadCloud,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from 'react-hot-toast'
import { API_BASE_URL } from '@/App'

export default function ScanReceipt() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [scanState, setScanState] = useState<"idle" | "scanning" | "success">(
    "idle"
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const processFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      setScanState("idle")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const simulateScan = () => {
    setScanState("scanning")
    // Simulate OCR processing time
    setTimeout(() => {
      setScanState("success")
    }, 3000)
  }

  const uploadImage = async () => {
    if (!file) return
    setScanState("scanning")
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/documents/extract`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        }
      )
      console.log("Upload response:", response.data)
      setScanState("success")
      toast.success("Receipt scanned and data inserted to Database!")
    } catch (error) {
      console.error("Error uploading receipt:", error)
      setScanState("idle")
    }
  }

  const reset = () => {
    setFile(null)
    setPreviewUrl(null)
    setScanState("idle")
  }

  return (
    <div className="mx-auto max-w-5xl animate-in duration-500 fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Smart Receipt Scanner
        </h1>
        <p className="mt-1 text-muted-foreground">
          Upload a receipt image. It will extract data using OCR (Optical
          Character Recognition). Then our AI Agent will extract relevant data,
          categorize the expense, and sync it to your dashboard!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
        {/* Upload / Preview Area */}
        <div className="flex h-[400px] flex-col">
          {!file ? (
            <div
              className={`upload-zone-dashed flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all duration-200 ${isDragging ? "scale-[1.02] border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary/50"} `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Drop receipt image here
              </h3>
              <p className="mb-8 max-w-xs text-center text-muted-foreground">
                Supports JPG, PNG, WEBP. High contrast images work best.
              </p>
              <Button className="h-12 text-lg font-medium">
                Browse File
              </Button>
            </div>
          ) : (
            <Card className="flex flex-1 flex-col overflow-hidden border-border/50 shadow-md">
              <CardHeader className="border-b border-border bg-muted/30 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">{file.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </CardDescription>
                    </div>
                  </div>
                  {scanState === "idle" && (
                    <Button variant="ghost" size="sm" onClick={reset}>
                      Cancel
                    </Button>
                  )}
                </div>
              </CardHeader>
              <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-neutral-900 p-4">
                <img
                  src={previewUrl!}
                  alt="Receipt Preview"
                  className={`max-h-full max-w-full rounded object-contain transition-all duration-500 ${scanState === "scanning" ? "scale-[1.02] opacity-80 contrast-125 filter" : ""} `}
                />

                {/* Scanner Animation Overlay */}
                {scanState === "scanning" && (
                  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded">
                    <div className="scanner-line"></div>
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                  </div>
                )}

                {/* Success Overlay */}
                {scanState === "success" && (
                  <div className="absolute inset-0 z-10 flex animate-in items-center justify-center bg-black/40 backdrop-blur-sm duration-300 fade-in">
                    <div className="flex max-w-xs flex-col items-center rounded-xl bg-card p-6 text-center shadow-xl">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="mb-1 text-lg font-semibold">
                        Processing Complete
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Receipt data has been successfully added to Your
                        Database.
                      </p>
                      <div className="flex w-full flex-col gap-1">
                        <Button
                          onClick={reset}
                          variant="default"
                          className="w-full"
                        >
                          Upload Another
                        </Button>
                        {/* <Button
                          onClick={reset}
                          variant="outline"
                          className="w-full"
                        >
                          View Database
                        </Button> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {scanState === "idle" && (
                <div className="border-t border-border bg-card p-4">
                  <Button
                    className="h-12 w-full text-lg font-medium"
                    onClick={uploadImage}
                  >
                    Extract Data <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
