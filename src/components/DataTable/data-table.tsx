"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  Row,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table/data-table-pagination";
import { DataTableToolbar } from "./data-table/data-table-toolbar";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    tableActions?: {
      updateUsers?: (rowIndex: number, users: number[]) => void;
      updateGroups?: (rowIndex: number, groups: number[]) => void;
      updateExtras?: (rowIndex: number, extras: number[]) => void;
      deleteRow: (rowIndex: number) => void;
      editRow: (rowIndex: number, data: Partial<TData>) => void;
    };
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableAcitons?: {
    updateUsers?: any;
    updateGroups?: any;
    updateExtras?: any;
    deleteRow?: any;
    editRow?: any;
  };
  options: {
    searchCol: string;
    pagination?: boolean;
    pageSize?: {
      default: boolean;
      options: number[];
    } | null;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableAcitons: {
    updateUsers = () => {},
    updateGroups = () => {},
    updateExtras = () => {},
    deleteRow = () => {},
    editRow = () => {},
  } = {},
  options: {
    searchCol,
    pagination = true,
    pageSize = { options: [10, 20, 30, 40, 50], default: true },
  },
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: [],
    right: ["actions"],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnPinning,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      tableActions: {
        updateUsers,
        updateGroups,
        updateExtras,
        deleteRow,
        editRow,
      },
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} options={{ searchCol }} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {pagination && (
          <DataTablePagination table={table} pageSize={pageSize} />
        )}
      </div>
    </div>
  );
}
