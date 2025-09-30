import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { products } from "./products";

export const wishlists = mysqlTable(
  "wishlists",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    productId: int("product_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    customerProductIdx: index("idx_wishlists_customer_product").on(
      table.customerId,
      table.productId
    ),
    customerFk: foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
    }).onDelete("cascade"),
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete("cascade"),
  })
);
