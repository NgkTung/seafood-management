"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { InventoryTable } from "./InventoryTable";
import { useState } from "react";

export default function Inventory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
        </div>
        <InventoryTable />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Approve batch</DialogTitle>
        </DialogContent>
      </div>
    </Dialog>
  );
}
