import { postData } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export const useCreateBatch = () => {
  return useMutation({
    mutationFn: (data) => postData("/api/batch/create", data),
  });
};
