import { postData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useApproveBatch() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => postData("/api/qc/approve-batch", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["qcs"] });
      qc.invalidateQueries({ queryKey: ["batches"] });
    },
  });
}
