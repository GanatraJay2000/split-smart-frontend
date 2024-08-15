import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "../data-table/data-table-row-actions";

import { GroupWithUsers, User } from "@/lib/types/dataTable/schema";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import GroupsModal from "../Modals/GroupsModal";

export const groupColumns: ColumnDef<GroupWithUsers>[] = [
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
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const users: User[] = row.getValue("users") ?? [];
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium flex gap-1">
            {users.map((user, idx) => (
              <Avatar key={idx} className="text-xs">
                <AvatarFallback className="py-1 !px-5">
                  {user.short}
                </AvatarFallback>
              </Avatar>
            ))}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enablePinning: true,
    cell: ({ row, table }) => (
      <DataTableRowActions row={row} table={table} Modal={GroupsModal} />
    ),
  },
];
