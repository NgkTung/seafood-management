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

import { useApproveBatch } from "@/hooks/qc/useApproveBatch";
import { useProfile } from "@/hooks/auth/profile";

interface Props {
  batchId: number;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ApproveBatchForm({ batchId, setIsOpen }: Props) {
  const approveBatch = useApproveBatch();
  const { data: userData } = useProfile();

  const formSchema = z.object({
    moisture: z.number().optional(),
    temperature: z.number().optional(),
    grade: z.string(),
    result: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moisture: undefined,
      temperature: undefined,
      grade: "",
      result: false,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    approveBatch.mutate(
      {
        Batch_ID: batchId,
        Status: values.result ? "Approved" : "Rejected",
        Inspector_ID: userData.user.userId,
        Moisture: values.moisture,
        Temperature: values.temperature,
        Grade: values.grade,
        Result: values.result ? "Pass" : "Fail",
      },
      {
        onSuccess: () => {
          form.reset();
          setTimeout(() => setIsOpen(false), 1500);
        },
      }
    );
  };

  return (
    <div className="max-w-md space-y-4">
      {approveBatch.error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md">
          {approveBatch.error.message || "Failed to approve batch"}
        </div>
      )}

      {approveBatch.isSuccess && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded-md">
          Batch QC submitted successfully!
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="moisture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moisture (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-[140px]">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Approve Batch<span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        className="h-5 w-5"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">
                        Mark as Approved
                      </span>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={approveBatch.isPending}
            type="submit"
            className="w-full"
          >
            {approveBatch.isPending ? "Submitting..." : "Submit QC"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
