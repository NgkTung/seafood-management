import BatchesTable from "@/components/Batch/BatchesTable";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Batches</h1>
      <BatchesTable />
    </div>
  );
}
