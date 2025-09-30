import {
  mysqlTable,
  serial,
  int,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { roles } from "./roles";
import { permissions } from "./permissions";

export const rolePermissions = mysqlTable(
  "role_permissions",
  {
    id: serial("id").primaryKey(),
    roleId: int("role_id").notNull(),
    permissionId: int("permission_id").notNull(),
  },
  (table) => ({
    rolePermIdx: index("idx_role_permissions").on(
      table.roleId,
      table.permissionId
    ),
    roleFk: foreignKey({
      columns: [table.roleId],
      foreignColumns: [roles.id],
    }).onDelete("cascade"),
    permFk: foreignKey({
      columns: [table.permissionId],
      foreignColumns: [permissions.id],
    }).onDelete("cascade"),
  })
);
