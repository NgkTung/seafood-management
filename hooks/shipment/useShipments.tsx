import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useShipments() {
  return useQuery({
    queryKey: ["shipments"],
    queryFn: () => fetcher("/api/shipment/get-all"),
  });
}
