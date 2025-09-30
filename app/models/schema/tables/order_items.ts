import {
  mysqlTable,
  serial,
  decimal,
  int,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = mysqlTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: int("order_id").notNull(),
    productId: int("product_id").notNull(),
    quantity: int("quantity").notNull(),
    priceAtPurchase: decimal("price_at_purchase", {
      precision: 10,
      scale: 2,
    }).notNull(),
  },
  (table) => ({
    orderIdx: index("idx_order_items_order_id").on(table.orderId),
    productIdx: index("idx_order_items_product_id").on(table.productId),
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete("cascade"),
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete("restrict"),
  })
);
