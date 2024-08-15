"use client";

import { RxDotsHorizontal } from "react-icons/rx";
import { Row, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
  Modal: React.ComponentType<{
    row: Row<TData>;
    editRow: any;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
  }>;
}

export function DataTableRowActions<TData>({
  row,
  table,
  Modal,
}: DataTableRowActionsProps<TData>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <RxDotsHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {row && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              className={cn(
                "rounded-sm w-full flex px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              )}
            >
              Edit
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <Modal
                row={row}
                setDialogOpen={setDialogOpen}
                editRow={table.options.meta?.tableActions?.editRow}
              />
            </DialogContent>
          </Dialog>
        )}
        <DropdownMenuItem
          onClick={() => {
            table.options.meta?.tableActions?.deleteRow?.(row.index);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
