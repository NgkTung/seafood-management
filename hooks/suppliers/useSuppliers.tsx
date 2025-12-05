import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetcher("/api/supplier/get-all"),
  });
}
