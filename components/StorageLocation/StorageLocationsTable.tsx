"use client";

import { useStorageLocations } from "@/hooks/storage-locations/useStorageLocations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StorageLocationRow } from "@/types/storage-location.type";

export default function StorageLocationsTable() {
  const { data, isLoading, isError } = useStorageLocations();

  if (isLoading) return <div className="p-4">Loading...</div>;

  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load locations
      </div>
    );

  const locations = data.locations;

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location ID</TableHead>
            <TableHead>Location Name</TableHead>
            <TableHead>Capacity (kg)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {locations.map((loc: StorageLocationRow) => (
            <TableRow key={loc.Location_ID}>
              <TableCell>{loc.Location_ID}</TableCell>
              <TableCell>{loc.Location_Name}</TableCell>
              <TableCell>{loc.Capacity.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
