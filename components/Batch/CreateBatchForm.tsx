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
  supplierId: z.string().min(1, "Vui lòng chọn nhà cung cấp"),
  productId: z.string().min(1, "Vui lòng chọn sản phẩm"),
  dateReceived: z.string().min(1, "Ngày nhận là bắt buộc"),
  weight: z
    .string()
    .min(1, "Khối lượng là bắt buộc")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Khối lượng phải là số lớn hơn 0",
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
          {createBatch.error.message || "Tạo lô thất bại"}
        </div>
      )}

      {createBatch.isSuccess && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md">
          Tạo lô thành công!
        </div>
      )}

      <Form<FormValues> {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nhà cung cấp<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn nhà cung cấp" />
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

            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Sản phẩm<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn sản phẩm" />
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="dateReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ngày nhận<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Khối lượng (kg)<span className="text-red-500">*</span>
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
            {createBatch.isPending ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
