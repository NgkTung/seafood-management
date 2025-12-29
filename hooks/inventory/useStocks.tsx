import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: () => fetcher(`/api/stock/get-all`),
  });
}
