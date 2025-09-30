import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  text,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { admins } from "./admins";

export const adminActions = mysqlTable(
  "admin_actions",
  {
    id: serial("id").primaryKey(),
    adminId: int("admin_id").notNull(),
    actionType: varchar("action_type", { length: 100 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    adminIdx: index("idx_admin_actions_admin_id").on(table.adminId),
    createdAtIdx: index("idx_admin_actions_created_at").on(table.createdAt),
    adminFk: foreignKey({
      columns: [table.adminId],
      foreignColumns: [admins.id],
    }).onDelete("cascade"),
  })
);
