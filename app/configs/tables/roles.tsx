// app/configs/tables/roles.ts
import { RoleDisplay } from "@/app/types/admins";
import { ColumnDef } from "@tanstack/react-table";

export const roleColumns: ColumnDef<RoleDisplay>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Role Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "—",
  },
];
