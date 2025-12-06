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

import { useCreateBatch } from "@/hooks/batches/useCreateBatch";
import { useSuppliers } from "@/hooks/suppliers/useSuppliers";
import { useProducts } from "@/hooks/products/useProducts";
import { Supplier } from "@/types/supplier.type";
import { Product } from "@/types/product.type";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  productId: z.string().min(1, "Product is required"),
  dateReceived: z.string().min(1, "Date received is required"),
  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Weight must be a number greater than 0",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBatchForm({ setIsOpen }: Props) {
  const createBatch = useCreateBatch();
  const { data: suppliers } = useSuppliers();
  const { data: products } = useProducts();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierId: "",
      productId: "",
      dateReceived: "",
      weight: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      Supplier_ID: Number(values.supplierId),
      Product_ID: Number(values.productId),
      Date_Received: values.dateReceived,
      Weight: Number(values.weight),
    };

    createBatch.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setTimeout(() => setIsOpen(false), 1500);
      },
    });
  };

  return (
    <div className="max-w-md space-y-4">
      {createBatch.error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md">
          {createBatch.error.message || "Failed to create batch"}
        </div>
      )}

      {createBatch.isSuccess && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md">
          Batch created successfully!
        </div>
      )}

      <Form<FormValues> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1: Supplier + Product */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Supplier */}
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Supplier<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers?.suppliers?.map((s: Supplier) => (
                        <SelectItem
                          key={s.Supplier_ID}
                          value={String(s.Supplier_ID)}
                        >
                          {s.Supplier_Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Product<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products?.products?.map((p: Product) => (
                        <SelectItem
                          key={p.Product_ID}
                          value={String(p.Product_ID)}
                        >
                          {p.Species}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Date + Weight */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Date Received */}
            <FormField
              control={form.control}
              name="dateReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Date Received<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Weight (kg)<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={createBatch.isPending}
            type="submit"
            className="w-full"
          >
            {createBatch.isPending ? "Creating..." : "Create Batch"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
