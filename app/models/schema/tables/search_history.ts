import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";

export const searchHistory = mysqlTable(
  "search_history",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    searchQuery: varchar("search_query", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    customerIdx: index("idx_search_history_customer").on(table.customerId),
    customerFk: foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
    }).onDelete("cascade"),
  })
);
