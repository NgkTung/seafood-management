import { postData } from "@/lib/utils";
import { CreateBatch } from "@/types/batch.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExportOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBatch) =>
      postData("/api/export-order/create", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["export-orders"] }),
  });
};
