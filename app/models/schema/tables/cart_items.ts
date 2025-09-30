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

export const cartItems = mysqlTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    productId: int("product_id").notNull(),
    quantity: int("quantity").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    customerProductIdx: index("idx_cart_items_customer_product").on(
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
