import { postData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      postData("/api/auth/login", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
