"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next-intl/link";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return <span>Is Admin</span>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("isAdmin") ? "+" : ""}</div>
    ),
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => {
      return <span>Is Blocked</span>;
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("isBlocked") ? "+" : ""}</div>
    ),
  },
  {
    accessorKey: "lastLoginTime",
    header: ({ column }) => {
      return <span>Last Login Time</span>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("lastLoginTime")).toLocaleTimeString() +
          " " +
          new Date(row.getValue("lastLoginTime")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "registrationTime",
    header: ({ column }) => {
      return <span>Registration Time</span>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {new Date(row.getValue("registrationTime")).toLocaleTimeString() +
          " " +
          new Date(row.getValue("registrationTime")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <span>View Profile</span>;
    },
    cell: ({ row }) => (
      <Link className="hover:underline" href={`/profile/${row.getValue("id")}`}>
        View Profile
      </Link>
    ),
  },
];
