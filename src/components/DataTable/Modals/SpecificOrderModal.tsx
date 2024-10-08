import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Order } from "@/lib/types/dataTable/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const specificOrderFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  cost: z.coerce.number().min(2, {
    message: "Cost must be greater than 0.",
  }),
});

export default function SpecificOrderModal({
  row,
  editRow,
  setDialogOpen,
}: {
  row: Row<Order["items"][number]>;
  editRow: (rowIndex: number, data: Partial<Order["items"][number]>) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof specificOrderFormSchema>>({
    resolver: zodResolver(specificOrderFormSchema),
    defaultValues: {
      name: row.getValue("name"),
      cost: row.getValue("cost"),
    },
  });

  function onSubmit(values: z.infer<typeof specificOrderFormSchema>) {
    setDialogOpen(false);
    editRow(row.index, values);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit</DialogTitle>
        <DialogDescription>Edit details about this row.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
