"use client";

import { useInventory } from "@/hooks/inventory/useInventory";
import { useBatches } from "@/hooks/batches/useBatches";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { InventoryRow } from "@/types/inventory.type";
import { Batch } from "@/types/batch.type";
import { Button } from "../ui/button";

interface Props {
  setSelectedBatchId: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function InventoryTable({
  setIsOpen,
  setSelectedBatchId,
}: Props) {
  // Inventory hook
  const {
    data: inventoryData,
    isLoading: inventoryLoading,
    error: inventoryError,
  } = useInventory();

  // Approved batches hook
  const {
    data: approvedBatchData,
    isLoading: batchLoading,
    error: batchError,
  } = useBatches({ status: "Approved" });

  if (inventoryLoading || batchLoading)
    return (
      <div className="w-full flex justify-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );

  if (inventoryError || batchError)
    return (
      <p className="text-red-500 text-sm">
        Failed to load inventory or batches.
      </p>
    );

  const inventories = inventoryData?.inventory ?? [];
  const approvedBatches = approvedBatchData?.batches ?? [];

  // Create a fast lookup for batch IDs that already exist in inventory
  const inventoryBatchIds = new Set(inventories.map((inv) => inv.Batch_ID));

  // Filter approved batches to only show ones NOT in inventory
  const filteredApprovedBatches = approvedBatches.filter(
    (b: Batch) => !inventoryBatchIds.has(b.Batch_ID)
  );

  return (
    <div className="space-y-6">
      {/* ================= INVENTORY TABLE ================= */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inventories.map((row: InventoryRow) => (
              <TableRow key={row.Batch_ID}>
                <TableCell>{row.Batch_ID}</TableCell>
                <TableCell>{row.Available_Quantity}</TableCell>
                <TableCell>{row.Location_Name ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ================= APPROVED BATCHES TABLE ================= */}
      <div className="text-lg font-semibold">Approved Batches</div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredApprovedBatches.map((b: Batch) => (
              <TableRow key={b.Batch_ID}>
                <TableCell>{b.Batch_ID}</TableCell>
                <TableCell>{b.Supplier_Name}</TableCell>
                <TableCell>{b.Product_Name}</TableCell>
                <TableCell className="text-green-600 font-medium">
                  {b.Status}
                </TableCell>
                <TableCell>
                  {new Date(b.Date_Received).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedBatchId(b.Batch_ID);
                    }}
                  >
                    Add to Storage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
