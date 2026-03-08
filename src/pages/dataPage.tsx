import { useState } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "../components/ui/table"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { API_BASE_URL } from "@/App"
import { useApiRequest } from "@/hooks/useApiRequest"
import { regularApiRequest } from "@/hooks/regularApiRequest"

type ReceiptItem = {
  id: number
  line_number: number
  description_raw: string
  description_norm: string
  quantity: number
  unit_price: number
  total_price: number
  category: string | null
}

type TransactionRow = {
  id: string
  merchant_name: string
  purchase_date: string
  subtotal: number
  tax: number
  total: number
  currency: string
  payment_method: string
  category_id: number
  category: string
  items?: ReceiptItem[]
  created_at?: string
}

export default function DataPage() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionRow | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  const { data, dataLoading, error } = useApiRequest({
    url: `${API_BASE_URL}/v1/data/items`,
    method: "GET",
  })

  const responseData = data as {
    items?: TransactionRow[]
    count?: number
  } | null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount)
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const handleViewDetails = async (transactionId: string) => {
    setDetailOpen(true)
    setDetailLoading(true)
    setDetailError(null)
    setSelectedTransaction(null)

    try {
      const response = await regularApiRequest({
        url: `${API_BASE_URL}/v1/data/transaction/detail/${transactionId}`,
        method: "GET",
      })

      const transaction = response?.data as TransactionRow | undefined

      if (!transaction) {
        setDetailError("Unable to load transaction details.")
        return
      }

      setSelectedTransaction(transaction)
    } catch {
      setDetailError("Unable to load transaction details.")
    } finally {
      setDetailLoading(false)
    }
  }

  if (dataLoading) {
    return (
      <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
        <h1 className="mb-6 text-2xl font-bold">Transaction History</h1>
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
        <h1 className="mb-6 text-2xl font-bold">Transaction History</h1>
        <div className="flex items-center justify-center p-8">
          <p className="text-destructive">
            Error loading transactions: {error?.message || "Unknown error"}
          </p>
        </div>
      </div>
    )
  }

  const items: TransactionRow[] = responseData?.items || []

  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <p className="text-sm text-muted-foreground">
          {responseData?.count || 0} total transactions
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <Table className="min-w-225">
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Date
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Store
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Category
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Payment Method
              </TableCell>
              <TableCell className="py-3 text-right text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Amount
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              items.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-accent/40"
                >
                  <TableCell className="px-2 py-3 align-middle">
                    {formatDate(row.purchase_date)}
                  </TableCell>
                  <TableCell className="px-2 py-3 align-middle font-medium">
                    {row.merchant_name}
                  </TableCell>
                  <TableCell className="px-2 py-3 align-middle">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {row.category}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 py-3 align-middle text-sm text-muted-foreground">
                    {row.payment_method}
                  </TableCell>
                  <TableCell className="px-2 py-3 text-right align-middle font-semibold">
                    {formatCurrency(row.total, row.currency)}
                  </TableCell>
                  <TableCell className="px-2 py-3 align-middle">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void handleViewDetails(row.id)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert(`View details for ${row.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => alert(`Delete ${row.id}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={detailOpen}
        onOpenChange={(open) => {
          setDetailOpen(open)
          if (!open) {
            setSelectedTransaction(null)
            setDetailError(null)
            setDetailLoading(false)
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              {selectedTransaction
                ? `${selectedTransaction.merchant_name} on ${formatDate(selectedTransaction.purchase_date)}`
                : ""}
            </DialogDescription>
          </DialogHeader>

          {detailLoading && (
            <div className="py-6 text-center text-muted-foreground">
              Loading transaction details...
            </div>
          )}

          {!detailLoading && detailError && (
            <div className="rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
              {detailError}
            </div>
          )}

          {!detailLoading && !detailError && selectedTransaction && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Receipt ID</p>
                  <p className="font-medium break-all">
                    {selectedTransaction.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium">
                    {selectedTransaction.category || "Uncategorized"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Purchase Date</p>
                  <p className="font-medium">
                    {formatDateTime(selectedTransaction.purchase_date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created At</p>
                  <p className="font-medium">
                    {selectedTransaction.created_at
                      ? formatDateTime(selectedTransaction.created_at)
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="font-medium">
                    {selectedTransaction.payment_method || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Currency</p>
                  <p className="font-medium">
                    {selectedTransaction.currency || "USD"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40">
                      <TableHead className="px-3 py-2">Line</TableHead>
                      <TableHead className="px-3 py-2">Item</TableHead>
                      <TableHead className="px-3 py-2 text-right">
                        Qty
                      </TableHead>
                      <TableHead className="px-3 py-2 text-right">
                        Unit Price
                      </TableHead>
                      <TableHead className="px-3 py-2 text-right">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTransaction.items &&
                    selectedTransaction.items.length > 0 ? (
                      selectedTransaction.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="px-3 py-2">
                            {item.line_number}
                          </TableCell>
                          <TableCell className="px-3 py-2">
                            {item.description_norm || item.description_raw}
                          </TableCell>
                          <TableCell className="px-3 py-2 text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="px-3 py-2 text-right">
                            {formatCurrency(
                              item.unit_price,
                              selectedTransaction.currency
                            )}
                          </TableCell>
                          <TableCell className="px-3 py-2 text-right font-medium">
                            {formatCurrency(
                              item.total_price,
                              selectedTransaction.currency
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-4 text-center text-muted-foreground"
                        >
                          No line items available for this transaction.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="ml-auto w-full max-w-xs space-y-2 rounded-lg border bg-muted/20 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatCurrency(
                      selectedTransaction.subtotal,
                      selectedTransaction.currency
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>
                    {formatCurrency(
                      selectedTransaction.tax,
                      selectedTransaction.currency
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      selectedTransaction.total,
                      selectedTransaction.currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </div>
  )
}
