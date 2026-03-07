import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../components/ui/table"
import { Button } from "../components/ui/button"

// Example data
const data = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "User" },
]

export default function DataPage() {
  return (
    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
      <h1 className="mb-6 text-2xl font-bold">Data Table</h1>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                ID
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Name
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Email
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Role
              </TableCell>
              <TableCell className="py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="transition-colors hover:bg-accent/40"
              >
                <TableCell className="px-2 py-3 align-middle">
                  {row.id}
                </TableCell>
                <TableCell className="px-2 py-3 align-middle">
                  {row.name}
                </TableCell>
                <TableCell className="px-2 py-3 align-middle">
                  {row.email}
                </TableCell>
                <TableCell className="px-2 py-3 align-middle">
                  {row.role}
                </TableCell>
                <TableCell className="px-2 py-3 align-middle">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Edit ${row.id}`)}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
