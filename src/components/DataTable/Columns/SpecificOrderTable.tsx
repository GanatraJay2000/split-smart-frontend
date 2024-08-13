import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Order } from "@/lib/types/dataTable/schema";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { users } from "@/lib/data/users";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export const columns: ColumnDef<Order["items"][number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost" />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users" />
    ),
    enableHiding: false,
    cell: ({ row, table }) => {
      const item_users = row.getValue("users") as number[];

      return (
        <div className="flex space-x-2">
          <ToggleGroup
            type="multiple"
            className="gap-5"
            variant="outline"
            defaultValue={item_users.map(String)}
            onValueChange={(value) => {
              table.options.meta?.updateUsers(
                row.index,
                value.map(Number).sort()
              );
            }}
          >
            {users.map((u, idx) => (
              <ToggleGroupItem
                className="data-[state=on]:bg-secondary"
                key={idx}
                value={u.id.toString()}
              >
                {u.short}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {/* { as number[]} */}
        </div>
      );
    },
  },
  {
    id: "actions",
    enablePinning: true,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
