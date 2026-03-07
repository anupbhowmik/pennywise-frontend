import { useState, useRef } from "react";
import { UploadCloud, FileJson, CheckCircle2, Image as ImageIcon, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanReceipt() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockParsedData = {
    merchant_name: "Whole Foods Market",
    merchant_address: "Columbus Circle, NY 10019",
    date: "2023-10-24T14:30:00Z",
    total_amount: 142.50,
    tax_amount: 11.40,
    category: "Groceries",
    items: [
      { description: "Organic Bananas", price: 4.99 },
      { description: "Almond Milk", price: 5.49 },
      { description: "Sourdough Bread", price: 6.99 },
      { description: "Chicken Breast", price: 12.50 },
      { description: "Avocado", price: 2.99 }
    ]
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setScanState('idle');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const simulateScan = () => {
    setScanState('scanning');
    // Simulate OCR processing time
    setTimeout(() => {
      setScanState('success');
    }, 3000);
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setScanState('idle');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Smart Receipt Scanner</h1>
        <p className="text-muted-foreground mt-1">Upload a receipt image. Our AI will extract the data, categorize the expense, and sync it to your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload / Preview Area */}
        <div className="flex flex-col h-[600px]">
          {!file ? (
            <div 
              className={`flex-1 flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer upload-zone-dashed
                ${isDragging ? 'bg-primary/5 border-primary scale-[1.02]' : 'bg-card hover:bg-secondary/50 border-border'}
              `}
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
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drop receipt image here</h3>
              <p className="text-muted-foreground text-center mb-8 max-w-xs">
                Supports JPG, PNG, WEBP. High contrast images work best.
              </p>
              <Button>Browse Files</Button>
            </div>
          ) : (
            <Card className="flex-1 flex flex-col overflow-hidden border-border/50 shadow-md">
              <CardHeader className="bg-muted/30 border-b border-border py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">{file.name}</CardTitle>
                      <CardDescription className="text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</CardDescription>
                    </div>
                  </div>
                  {scanState === 'idle' && (
                    <Button variant="ghost" size="sm" onClick={reset}>Cancel</Button>
                  )}
                </div>
              </CardHeader>
              <div className="flex-1 relative bg-neutral-900 overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={previewUrl!} 
                  alt="Receipt Preview" 
                  className={`max-w-full max-h-full object-contain rounded transition-all duration-500
                    ${scanState === 'scanning' ? 'opacity-80 scale-[1.02] filter contrast-125' : ''}
                  `}
                />
                
                {/* Scanner Animation Overlay */}
                {scanState === 'scanning' && (
                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded">
                    <div className="scanner-line"></div>
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                  </div>
                )}
                
                {/* Success Overlay */}
                {scanState === 'success' && (
                  <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-card p-6 rounded-xl shadow-xl flex flex-col items-center text-center max-w-xs">
                      <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-500">
                         <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">Processing Complete</h3>
                      <p className="text-sm text-muted-foreground mb-4">Receipt data has been successfully extracted.</p>
                      <Button onClick={reset} variant="outline" className="w-full">Upload Another</Button>
                    </div>
                  </div>
                )}
              </div>
              
              {scanState === 'idle' && (
                <div className="p-4 bg-card border-t border-border">
                  <Button className="w-full h-12 text-lg font-medium" onClick={simulateScan}>
                    Extract Data <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Results / Processing Panel */}
        <Card className={`h-[600px] flex flex-col border-border/50 shadow-sm transition-opacity duration-300 ${!file ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <CardHeader className="border-b border-border bg-muted/10">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-primary" />
              <CardTitle>Extracted Data (JSON)</CardTitle>
            </div>
            <CardDescription>Structured output from our OCR engine</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col relative">
             {scanState === 'idle' && (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                   <FileJson className="h-12 w-12 mb-4 opacity-20" />
                   <p>Awaiting extraction. Click "Extract Data" to process the receipt.</p>
                </div>
             )}

             {scanState === 'scanning' && (
               <div className="flex-1 flex flex-col items-center justify-center text-primary p-8">
                 <Loader2 className="h-10 w-10 animate-spin mb-4" />
                 <p className="font-medium animate-pulse">Running OCR & AI Analysis...</p>
                 <p className="text-xs text-muted-foreground mt-2">Identifying merchant, items, and totals</p>
               </div>
             )}

             {scanState === 'success' && (
                <div className="flex-1 overflow-auto bg-neutral-950 p-4 font-mono text-sm">
                  <pre className="text-emerald-400 whitespace-pre-wrap animate-in fade-in duration-700">
                    {JSON.stringify(mockParsedData, null, 2)}
                  </pre>
                </div>
             )}
             
             {scanState === 'success' && (
               <div className="p-4 border-t border-border bg-card">
                 <Button className="w-full">
                   Save to Database
                 </Button>
               </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}