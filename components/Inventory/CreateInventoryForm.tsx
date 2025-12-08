"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useCreateInventory } from "@/hooks/inventory/useCreateInventory";
import { useStorageLocations } from "@/hooks/storage-locations/useStorageLocations";
import { StorageLocationRow } from "@/types/storage-location.type";

interface Props {
  batchId: number;
  setIsOpen: (state: boolean) => void;
}

const formSchema = z.object({
  locationId: z.string().min(1, "Location is required"),
  availableQty: z
    .string()
    .min(1, "Quantity is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
      message: "Quantity must be 0 or greater",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateInventoryForm({ setIsOpen, batchId }: Props) {
  const createInventory = useCreateInventory();
  const { data: locations } = useStorageLocations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationId: "",
      availableQty: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      Batch_ID: batchId,
      Available_Quantity: Number(values.availableQty),
      Location_ID: Number(values.locationId),
    };

    createInventory.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setTimeout(() => setIsOpen(false), 1200);
      },
    });
  };

  return (
    <div className="max-w-md space-y-4">
      {createInventory.error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md">
          {createInventory.error.message || "Failed to create inventory"}
        </div>
      )}

      {createInventory.isSuccess && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md">
          Inventory created successfully!
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Row: Location + Quantity */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Location */}
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 px-3">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.locations?.map((loc) => (
                        <SelectItem
                          key={loc.Location_ID}
                          value={String(loc.Location_ID)}
                        >
                          {loc.Location_Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableQty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Available Quantity<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="h-10 px-3"
                      min="0"
                      placeholder="1200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={createInventory.isPending}
            type="submit"
            className="w-full"
          >
            {createInventory.isPending ? "Creating..." : "Create Inventory"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
