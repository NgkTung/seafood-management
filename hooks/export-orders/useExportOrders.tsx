import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useExportOrders() {
  return useQuery({
    queryKey: ["export-orders"],
    queryFn: () => fetcher(`/api/export-order/get-all`),
  });
}
