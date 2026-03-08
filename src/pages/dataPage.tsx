import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../components/ui/table"
import { Button } from "../components/ui/button"
import { API_BASE_URL } from "@/App"
import { useApiRequest } from "@/hooks/useApiRequest"

export default function DataPage() {
  const { data, dataLoading, error } = useApiRequest({
    url: `${API_BASE_URL}/v1/data/items`,
    method: "GET",
  })

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
            Error loading transactions: {error}
          </p>
        </div>
      </div>
    )
  }

  const items = data?.items || []

  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <p className="text-sm text-muted-foreground">
          {data?.count || 0} total transactions
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Date
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Merchant
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
              items.map((row: any) => (
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
    </div>
  )
}
