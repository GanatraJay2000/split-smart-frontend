import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { User } from "@/lib/types/dataTable/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

export const groupsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  short: z.string().min(2, {
    message: "Short must be at least 2 characters.",
  }),
});

export default function UsersModal({
  row,
  editRow,
  setDialogOpen,
}: {
  row: Row<User>;
  editRow: (rowIndex: number, data: Partial<User>) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof groupsFormSchema>>({
    resolver: zodResolver(groupsFormSchema),
    defaultValues: {
      name: row.getValue("name"),
      short: row.original.short,
    },
  });

  function onSubmit(values: z.infer<typeof groupsFormSchema>) {
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
            name="short"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short</FormLabel>
                <FormControl>
                  <Input {...field} />
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
