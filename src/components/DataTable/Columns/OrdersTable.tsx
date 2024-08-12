import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Order } from "@/lib/types/dataTable/schema";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { users } from "@/lib/data/users";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    accessorKey: "users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users" />
    ),
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <ToggleGroup type="multiple" className="gap-5">
            {users.map((u, idx) => (
              <ToggleGroupItem key={idx} value={u.id.toString()}>
                {u.short}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {/* {row.getValue("users") as number[]} */}
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
