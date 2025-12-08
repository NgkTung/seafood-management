"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import CreateInventoryForm from "./CreateInventoryForm";
import InventoryTable from "./InventoryTable";
import { useState } from "react";

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Tồn kho</h1>
        </div>
        <InventoryTable
          setIsOpen={setIsOpen}
          setSelectedBatchId={setSelectedBatchId}
        />
        <DialogContent className="max-w-sm!">
          <DialogTitle>
            Thêm lô hàng vào tồn kho (#{selectedBatchId})
          </DialogTitle>
          <CreateInventoryForm
            batchId={selectedBatchId!}
            setIsOpen={setIsOpen}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
}
