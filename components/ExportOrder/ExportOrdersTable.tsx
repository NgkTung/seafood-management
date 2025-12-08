"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useExportOrders } from "@/hooks/export-orders/useExportOrders";
import { ExportOrderRow } from "@/types/export-order.type";

export default function ExportOrdersTable() {
  const { data, isLoading } = useExportOrders();

  if (isLoading) return <div className="p-4">Loading...</div>;

  const orders = data?.orders || [];

  return (
    <div className="w-full rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Shipping Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((o: ExportOrderRow) => (
            <TableRow key={o.Order_ID}>
              <TableCell>{o.Order_ID}</TableCell>
              <TableCell>{o.Customer_Name}</TableCell>
              <TableCell>
                {new Date(o.Order_Date).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                {new Date(o.Shipping_Date).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                <span
                  className={
                    o.Status === "Approved"
                      ? "text-green-600 font-medium"
                      : o.Status === "Shipped"
                      ? "text-blue-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {o.Status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
