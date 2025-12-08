import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => fetcher(`/api/customer/get-all`),
  });
}
