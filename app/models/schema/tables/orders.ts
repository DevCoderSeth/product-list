import {
  mysqlTable,
  serial,
  varchar,
  decimal,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { admins } from "./admins";

export const orders = mysqlTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
    status: varchar("status", { length: 50 }).default("pending").notNull(),
    verifiedBy: int("verified_by"), // Accountant who verified payment
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    customerIdx: index("idx_orders_customer_id").on(table.customerId),
    verifiedByIdx: index("idx_orders_verified_by").on(table.verifiedBy),
    customerFk: foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
    }).onDelete("restrict"),
    verifiedByFk: foreignKey({
      columns: [table.verifiedBy],
      foreignColumns: [admins.id],
    }).onDelete("set null"),
  })
);
