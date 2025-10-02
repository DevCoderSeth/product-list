import { AdminDisplay } from "@/app/types/admins";
import { ColumnDef } from "@tanstack/react-table";

export const adminColumns: ColumnDef<AdminDisplay>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ row }) => row.original.first_name || "—",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => row.original.last_name || "—",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role_name",
    header: "Role",
    cell: ({ row }) =>
      row.original.role_name || `Role ID: ${row.original.role_id}`,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
];
