import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  index,
  uniqueIndex,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { admins } from "./admins";

export const locations = mysqlTable(
  "locations",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    type: varchar("type", { length: 50 }),
    managerId: int("manager_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    nameIdx: uniqueIndex("idx_locations_name").on(table.name),
    managerIdx: index("idx_locations_manager_id").on(table.managerId),
    managerFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [admins.id],
    }).onDelete("set null"),
  })
);
