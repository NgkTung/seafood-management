import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import BatchesTable from "./BatchesTable";
import CreateBatchForm from "./CreateBatchForm";

export default function Batch() {
  return (
    <Dialog>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Batches</h1>
          <DialogTrigger asChild>
            <Button>Create new batch</Button>
          </DialogTrigger>
        </div>
        <BatchesTable />
        <DialogContent className="max-w-sm!">
          <DialogTitle>Create new batch</DialogTitle>
          <CreateBatchForm />
        </DialogContent>
      </div>
    </Dialog>
  );
}
