"use client";

import { useInventory } from "@/hooks/inventory/useInventory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export function InventoryTable() {
  const { data, isLoading, error } = useInventory();

  if (isLoading)
    return (
      <div className="w-full flex justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );

  if (error)
    return <p className="text-red-500 text-sm">Failed to load inventory.</p>;

  const inventories = data?.inventory ?? [];

  return (
    <div className="rounded-md border bg-white p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Received</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {inventories.map((row: InventoryRow) => (
            <TableRow key={row.Batch_ID}>
              <TableCell>{row.Batch_ID}</TableCell>
              <TableCell>{row.Supplier_Name}</TableCell>
              <TableCell>{row.Product_Name}</TableCell>
              <TableCell>{row.Available_Quantity}</TableCell>
              <TableCell>{row.Location_Name || "N/A"}</TableCell>

              <TableCell>
                <span
                  className={
                    row.Batch_Status === "Approved"
                      ? "text-green-600 font-medium"
                      : row.Batch_Status === "Rejected"
                      ? "text-red-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {row.Batch_Status}
                </span>
              </TableCell>

              <TableCell>
                {new Date(row.Date_Received).toLocaleDateString("vi-VN")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
