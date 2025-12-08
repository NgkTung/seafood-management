"use client";

import { Dialog } from "../ui/dialog";
import { useState } from "react";
import ShipmentTable from "./ShipmentTable";

export default function Shipment() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Vận chuyển</h1>
        </div>
        <ShipmentTable />
      </div>
    </Dialog>
  );
}
