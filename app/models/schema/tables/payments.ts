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
import { orders } from "./orders";
import { admins } from "./admins";

export const payments = mysqlTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    orderId: int("order_id").notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    transactionId: varchar("transaction_id", { length: 100 }),
    failureReason: varchar("failure_reason", { length: 255 }), // Reason for failed payment
    installmentNumber: int("installment_number"), // For tracking installment sequence
    verifiedBy: int("verified_by"), // Accountant who verified
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    orderIdx: index("idx_payments_order_id").on(table.orderId),
    verifiedByIdx: index("idx_payments_verified_by").on(table.verifiedBy),
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete("cascade"),
    verifiedByFk: foreignKey({
      columns: [table.verifiedBy],
      foreignColumns: [admins.id],
    }).onDelete("set null"),
  })
);
