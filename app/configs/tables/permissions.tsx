
import { PermissionDisplay } from "@/app/types/admins";
import { ColumnDef } from "@tanstack/react-table";

export const permissionColumns: ColumnDef<PermissionDisplay >[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Permission Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "—",
  },
];
