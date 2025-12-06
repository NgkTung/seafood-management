import { postData } from "@/lib/utils";
import { CreateBatch } from "@/types/batch.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBatch = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBatch) => postData("/api/batch/create", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["batches"] }),
  });
};
