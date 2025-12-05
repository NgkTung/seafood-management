import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useQCs() {
  return useQuery({
    queryKey: ["qcs"],
    queryFn: () => fetcher("/api/qc/get-all"),
  });
}
