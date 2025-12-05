import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useBatches(params?: { status?: string }) {
  const queryString = params
    ? "?" + new URLSearchParams(params as any).toString()
    : "";

  return useQuery({
    queryKey: ["batches", params],
    queryFn: () => fetcher(`/api/batch/get-all${queryString}`),
  });
}
