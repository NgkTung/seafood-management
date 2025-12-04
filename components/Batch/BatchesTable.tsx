"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBatches } from "@/hooks/batches/useBatches";

export default function BatchesTable() {
  const { data, isLoading } = useBatches();

  if (isLoading) return <div className="p-4">Loading...</div>;

  const batches = data?.batches || [];

  return (
    <div className="w-full rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Date Received</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batches.map((b: any) => (
            <TableRow key={b.Batch_ID}>
              <TableCell>{b.Batch_ID}</TableCell>
              <TableCell>{b.Supplier_Name}</TableCell>
              <TableCell>{b.Product_Name}</TableCell>
              <TableCell>{b.Date_Received}</TableCell>
              <TableCell>{b.Weight.toLocaleString()}</TableCell>
              <TableCell>
                <span
                  className={
                    b.Status === "Approved"
                      ? "text-green-600 font-medium"
                      : b.Status === "Rejected"
                      ? "text-red-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {b.Status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
