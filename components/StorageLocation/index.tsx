"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import StorageLocationsTable from "./StorageLocationsTable";
import { useState } from "react";

export default function StorageLocation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Storage Location</h1>
        </div>
        <StorageLocationsTable />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Approve batch</DialogTitle>
        </DialogContent>
      </div>
    </Dialog>
  );
}
