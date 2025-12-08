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

import { useCustomers } from "@/hooks/customers/useCustomers";
import { useCreateExportOrder } from "@/hooks/export-orders/useCreateExportOrder";
import { CustomerRow } from "@/types/customer.type";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  orderDate: z.string().min(1, "Order date is required"),
  shippingDate: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateExportOrderForm({ setIsOpen }: Props) {
  const createOrder = useCreateExportOrder();
  const { data: customers } = useCustomers();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      orderDate: "",
      shippingDate: "",
      status: "Draft",
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = {
      Customer_ID: Number(values.customerId),
      Order_Date: values.orderDate,
      Shipping_Date: values.shippingDate || null,
      Status: values.status,
    };

    createOrder.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setTimeout(() => setIsOpen(false), 1200);
      },
    });
  };

  return (
    <div className="max-w-md space-y-4">
      {createOrder.error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md">
          {createOrder.error.message || "Failed to create export order"}
        </div>
      )}

      {createOrder.isSuccess && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md">
          Export order created successfully!
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1: Customer + Status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Customer */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Customer <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers?.customers?.map((c: CustomerRow) => (
                        <SelectItem
                          key={c.Customer_ID}
                          value={String(c.Customer_ID)}
                        >
                          {c.Customer_Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Status <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Dates */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Order Date */}
            <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Order Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shipping Date */}
            <FormField
              control={form.control}
              name="shippingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            disabled={createOrder.isPending}
            type="submit"
            className="w-full"
          >
            {createOrder.isPending ? "Creating..." : "Create Export Order"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
