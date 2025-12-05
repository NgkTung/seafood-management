"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQCs } from "@/hooks/qc/useQCs";
import { useBatches } from "@/hooks/batches/useBatches";
import { Button } from "../ui/button";

interface Props {
  setSelectedBatchId: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function QCsTable({ setSelectedBatchId, setIsOpen }: Props) {
  const { data: qcData, isLoading: qcLoading } = useQCs();
  const { data: batchData, isLoading: batchLoading } = useBatches({
    status: "Pending",
  });

  if (qcLoading || batchLoading) return <div className="p-4">Loading...</div>;

  const inspections = qcData?.inspections || [];
  const pendingBatches = batchData?.batches || [];

  return (
    <div className="space-y-6">
      <div className="w-full rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>QC ID</TableHead>
              <TableHead>Batch ID</TableHead>
              <TableHead>Inspector</TableHead>
              <TableHead>Moisture %</TableHead>
              <TableHead>Temperature (°C)</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Inspection Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inspections.map((q: any) => (
              <TableRow key={q.QC_ID}>
                <TableCell>{q.QC_ID}</TableCell>
                <TableCell>{q.Batch_ID}</TableCell>
                <TableCell>{q.Inspector_Name}</TableCell>
                <TableCell>{q.Moisture}</TableCell>
                <TableCell>{q.Temperature}</TableCell>
                <TableCell>{q.Grade}</TableCell>
                <TableCell>
                  <span
                    className={
                      q.Result === "Pass"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {q.Result}
                  </span>
                </TableCell>
                <TableCell>{q.Inspection_Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-lg font-semibold">Pending Batches</div>

      <div className="w-full rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pendingBatches.map((b: any) => (
              <TableRow key={b.Batch_ID}>
                <TableCell>{b.Batch_ID}</TableCell>
                <TableCell>{b.Supplier_Name}</TableCell>
                <TableCell>{b.Product_Name}</TableCell>
                <TableCell>{b.Date_Received}</TableCell>
                <TableCell>{b.Weight.toLocaleString()}</TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedBatchId(b.Batch_ID);
                      setIsOpen(true);
                    }}
                  >
                    Inspect
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
