import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => fetcher("/api/auth/me"),
  });
}
