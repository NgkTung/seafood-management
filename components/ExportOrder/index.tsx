"use client";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import ExportOrdersTable from "./ExportOrdersTable";
import { useState } from "react";
import { Button } from "../ui/button";
import CreateExportOrderForm from "./CreateExportOrderForm";

export default function ExportOrder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Export Order</h1>
          <DialogTrigger>
            <Button>Create New Export Order</Button>
          </DialogTrigger>
        </div>
        <ExportOrdersTable />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Create New Export Order</DialogTitle>
          <CreateExportOrderForm setIsOpen={setIsOpen} />
        </DialogContent>
      </div>
    </Dialog>
  );
}
