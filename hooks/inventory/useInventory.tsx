import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => fetcher(`/api/inventory/get-all`),
  });
}
