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
import { Batch } from "@/types/batch.type";

export default function BatchesTable() {
  const { data, isLoading } = useBatches();

  if (isLoading) return <div className="p-4">Loading...</div>;

  const batches = data?.batches || [];

  return (
    <div className="w-full rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nhà cung cấp</TableHead>
            <TableHead>Mặt hàng</TableHead>
            <TableHead>Ngày nhận</TableHead>
            <TableHead>Cân nặng (kg)</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {batches.map((b: Batch) => (
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
                  {b.Status === "Approved"
                    ? "Đã xác nhận"
                    : b.Status === "Rejected"
                    ? "Từ chối"
                    : "Đang chờ"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
