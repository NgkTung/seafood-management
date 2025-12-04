import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useBatches() {
  return useQuery({
    queryKey: ["batches"],
    queryFn: () => fetcher("/api/batch/get-all"),
  });
}
