"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import ApproveBatchForm from "./ApproveBatchForm";

import QCsTable from "./QCsTable";
import { useState } from "react";

export default function QC() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Kiểm soát chất lượng</h1>
        </div>
        <QCsTable
          setIsOpen={setIsOpen}
          setSelectedBatchId={setSelectedBatchId}
        />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Xác nhận lô hàng {selectedBatchId}</DialogTitle>
          <ApproveBatchForm batchId={selectedBatchId!} setIsOpen={setIsOpen} />
        </DialogContent>
      </div>
    </Dialog>
  );
}
