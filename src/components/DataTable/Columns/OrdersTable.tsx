import { DataTableColumnHeader } from "../data-table/data-table-column-header";

import { ColumnDef } from "@tanstack/react-table";
import { Minus, Plus } from "lucide-react";

import { Order, Platform } from "@/lib/types/dataTable/schema";
import { users } from "@/lib/data/users";
import { groups } from "@/lib/data/groups";
import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DataTableRowActions } from "../data-table/data-table-row-actions";
import SpecificOrderModal from "../Modals/SpecificOrderModal";
import Link from "next/link";

export const orderColumns: ColumnDef<Order>[] = [
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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("date")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "platform",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            {(row.getValue("platform") as Platform).name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link href={`/dashboard/orders/${parseInt(row.id) + 1}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      );
    },
  },

  {
    id: "actions",
    enablePinning: true,
    cell: ({ row, table }) => <></>, //<DataTableRowActions row={row} table={table} />,
  },
];
