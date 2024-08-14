import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Order } from "@/lib/types/dataTable/schema";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import { groups, users } from "@/lib/data/users";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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
    accessorKey: "groups",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Groups" />
    ),
    enableSorting: false,

    cell: ({ row, table }) => {
      const item_groups = row.getValue("groups") as number[];

      return (
        <div className="">
          <ToggleGroup
            type="multiple"
            className="gap-2"
            variant="outline"
            value={item_groups.map(String)}
            defaultValue={item_groups.map(String)}
            onValueChange={(value) => {
              table.options.meta?.updateGroups(
                row.index,
                value.map(Number).sort()
              );
            }}
          >
            {groups.map((g, idx) => (
              <ToggleGroupItem
                key={idx}
                className="data-[state=on]:bg-secondary"
                value={g.id.toString()}
              >
                {g.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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

    cell: ({ row, cell, table }) => {
      const item_users = row.getValue("users") as number[];
      const extras = row.original.extras as number[];
      return (
        <div className="">
          {item_users && (
            <ToggleGroup
              type="multiple"
              className="gap-2"
              variant="outline"
              defaultValue={item_users.map(String)}
              value={item_users.map(String)}
              onValueChange={(value) => {
                table.options.meta?.updateUsers(
                  row.index,
                  value.map(Number).sort()
                );
              }}
            >
              {users.map((u, idx) => {
                return (
                  <ContextMenu key={idx}>
                    <ContextMenuTrigger className="relative">
                      <ToggleGroupItem
                        className={cn("data-[state=on]:bg-secondary", {
                          "data-[state=on]:bg-black data-[state=on]:text-white bg-gray-200":
                            extras.includes(u.id),
                        })}
                        key={idx}
                        value={u.id.toString()}
                      >
                        {u.short}
                      </ToggleGroupItem>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="-translate-x-1/2 translate-y-1/2">
                      <div className="p-2 flex gap-2 items-center justify-between w-full">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 "
                          onClick={() => {
                            const idx = extras.indexOf(u.id);
                            if (idx > -1) extras.splice(idx, 1);
                            table.options.meta?.updateExtras(row.index, [
                              ...extras,
                            ]);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                        {extras.filter((e) => e === u.id).length}
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 shrink-0 "
                          onClick={() => {
                            table.options.meta?.updateExtras(row.index, [
                              ...extras,
                              u.id,
                            ]);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })}
            </ToggleGroup>
          )}
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
