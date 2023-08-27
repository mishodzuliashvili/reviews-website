"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Blocks,
  ChevronDown,
  Delete,
  DeleteIcon,
  Lock,
  Trash,
  Unlock,
  UserMinus,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getColumns } from "./columns";
import { useTranslations } from "next-intl";
import { redirect, useRouter } from "next/navigation";
import { useMain } from "../mainContext";
import { signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import MainLoader from "@/components/my-ui/MainLoader";

export function DataTable({ data: datum }: { data: User[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { user } = useMain();
  const [loading, setLoading] = React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const t = useTranslations("DataTable");
  const columns = getColumns(t);
  const [data, setData] = React.useState<User[]>(datum);
  const { toast } = useToast();
  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel({
      initialSync: true,
    }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });
  const router = useRouter();
  return (
    <div className="w-full">
      {loading && <MainLoader />}
      <div className="flex gap-3 flex-wrap">
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            const userIds = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            table.setRowSelection({});
            setData((prevData) =>
              prevData.filter((user) => !userIds.includes(user.id))
            );

            fetch("/api/users", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userIds }),
            })
              .then(() => {
                toast({
                  title: t("success-title"),
                  description: t("success-description"),
                });
                if (user && userIds.includes(user.id)) {
                  signOut();
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="destructive"
        >
          <Trash className="h-4 w-4 mr-2 -mt-1" /> {t("delete")}
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            const userIds = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            table.setRowSelection({});
            setData((prevData) =>
              prevData.map((user) =>
                userIds.includes(user.id) ? { ...user, isBlocked: true } : user
              )
            );

            fetch("/api/users/block", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userIds }),
            })
              .then(() => {
                toast({
                  title: t("success-title"),
                  description: t("success-description"),
                });
                if (user && userIds.includes(user.id)) {
                  signOut();
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="outline"
        >
          <Lock className="h-4 w-4 mr-2 -mt-1" /> {t("block")}
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            const userIds = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            table.setRowSelection({});
            setData((prevData) =>
              prevData.map((user) =>
                userIds.includes(user.id) ? { ...user, isBlocked: false } : user
              )
            );

            fetch("/api/users/block", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userIds }),
            })
              .then(() => {
                toast({
                  title: t("success-title"),
                  description: t("success-description"),
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="outline"
        >
          <Unlock className="h-4 w-4 mr-2 -mt-1" /> {t("unblock")}
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            const userIds = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            table.setRowSelection({});
            setData((prevData) =>
              prevData.map((user) =>
                userIds.includes(user.id) ? { ...user, isAdmin: true } : user
              )
            );

            fetch("/api/users/admin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userIds }),
            })
              .then(() => {
                toast({
                  title: t("success-title"),
                  description: t("success-description"),
                });
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="outline"
        >
          <UserPlus className="h-4 w-4 mr-2 -mt-1" /> {t("make-admin")}
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            const userIds = table
              .getSelectedRowModel()
              .rows.map((row) => row.original.id);
            table.setRowSelection({});
            setData((prevData) =>
              prevData.map((user) =>
                userIds.includes(user.id) ? { ...user, isAdmin: false } : user
              )
            );

            fetch("/api/users/admin", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userIds }),
            })
              .then(() => {
                toast({
                  title: t("success-title"),
                  description: t("success-description"),
                });
                if (user && userIds.includes(user.id)) {
                  window.location.replace("/");
                }
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="outline"
        >
          <UserMinus className="h-4 w-4 mr-2 -mt-1" /> {t("make-non-admin")}
        </Button>
      </div>
      <div className="flex items-center py-4 gap-3 flex-wrap">
        <Input
          placeholder={t("filter-emails-placeholder")}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t("columns")} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {t(column.id.toLowerCase())}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {t("no-results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} {t("of")}{" "}
          {table.getFilteredRowModel().rows.length} {t("rows-selected")}.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
