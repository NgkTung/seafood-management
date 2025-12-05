import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher("/api/product/get-all"),
  });
}
