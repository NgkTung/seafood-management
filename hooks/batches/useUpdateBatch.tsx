import { postData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBatch() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => postData("/api/batch/update", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["batches"] });
    },
  });
}
