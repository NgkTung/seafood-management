"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useShipments } from "@/hooks/shipment/useShipments";

export default function ShipmentTable() {
  const { data, isLoading, error } = useShipments();

  if (isLoading) return <div className="p-4">Đang tải...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500">Không thể tải dữ liệu shipment.</div>
    );

  const shipments = data?.shipments || [];

  return (
    <div className="w-full rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã Shipment</TableHead>
            <TableHead>Mã Đơn Hàng</TableHead>
            <TableHead>Ngày Giao</TableHead>
            <TableHead>Hãng Vận Chuyển</TableHead>
            <TableHead>Số Phương Tiện</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {shipments.map((s) => (
            <TableRow key={s.Shipment_ID}>
              <TableCell>{s.Shipment_ID}</TableCell>
              <TableCell>{s.Order_ID}</TableCell>
              <TableCell>
                {new Date(s.Shipment_Date).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell>{s.Carrier}</TableCell>
              <TableCell>{s.Vehicle_Number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
