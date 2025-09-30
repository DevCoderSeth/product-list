import {
  mysqlTable,
  serial,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const permissions = mysqlTable(
  "permissions",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
  },
  (table) => ({
    nameIdx: uniqueIndex("idx_permissions_name").on(table.name),
  })
);
