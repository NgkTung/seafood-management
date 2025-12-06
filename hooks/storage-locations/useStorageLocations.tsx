import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useStorageLocations() {
  return useQuery({
    queryKey: ["storage-locations"],
    queryFn: () => fetcher(`/api/storage-location/get-all`),
  });
}
