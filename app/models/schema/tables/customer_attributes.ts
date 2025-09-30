import {
  mysqlTable,
  serial,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const customerAttributes = mysqlTable(
  "customer_attributes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
  },
  (table) => ({
    nameIdx: uniqueIndex("idx_customer_attributes_name").on(table.name),
  })
);
