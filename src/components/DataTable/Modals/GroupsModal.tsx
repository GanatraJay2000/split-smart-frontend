import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { users } from "@/lib/data/users";
import {
  Group,
  GroupWithUsers,
  Order,
  User,
  userSchema,
} from "@/lib/types/dataTable/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

export const groupsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  users: z.array(userSchema).min(2, {
    message: "You have to select at least two users.",
  }),
});

export default function GroupsModal({
  row,
  editRow,
  setDialogOpen,
}: {
  row: Row<GroupWithUsers>;
  editRow: (rowIndex: number, data: Partial<GroupWithUsers>) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof groupsFormSchema>>({
    resolver: zodResolver(groupsFormSchema),
    defaultValues: {
      name: row.getValue("name"),
      users: row.getValue("users"),
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
            name="users"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Users</FormLabel>
                </div>
                {users.map((user) => (
                  <FormField
                    key={user.id}
                    control={form.control}
                    name="users"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={user.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value.some(
                                (a) => a.id === user.id
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, user])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value.id !== user.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {user.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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
