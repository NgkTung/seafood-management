import { postData } from "@/lib/utils";
import { CreateInventory } from "@/types/inventory.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateInventory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventory) =>
      postData("/api/inventory/create", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inventory"] });
      qc.invalidateQueries({ queryKey: ["batches"] });
    },
  });
};
