import { postData } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: () => postData("/api/auth/logout", {}),
  });
}
