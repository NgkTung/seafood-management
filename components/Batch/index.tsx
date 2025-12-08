"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import BatchesTable from "./BatchesTable";
import CreateBatchForm from "./CreateBatchForm";
import { useState } from "react";

export default function Batch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Lô hàng</h1>
          <DialogTrigger asChild>
            <Button>Tạo lô hàng mới</Button>
          </DialogTrigger>
        </div>
        <BatchesTable />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Tạo lô hàng mới</DialogTitle>
          <CreateBatchForm setIsOpen={setIsOpen} />
        </DialogContent>
      </div>
    </Dialog>
  );
}
