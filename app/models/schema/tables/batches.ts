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
import { products } from "./products";
import { suppliers } from "./suppliers";

export const batches = mysqlTable(
  "batches",
  {
    id: serial("id").primaryKey(),
    productId: int("product_id").notNull(),
    batchNumber: varchar("batch_number", { length: 100 }).notNull(),
    supplierId: int("supplier_id"),
    costPriceAtPurchase: decimal("cost_price_at_purchase", {
      precision: 10,
      scale: 2,
    }).notNull(),
    purchaseDate: timestamp("purchase_date").notNull(),
    initialQuantity: int("initial_quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    productIdx: index("idx_batches_product_id").on(table.productId),
    supplierIdx: index("idx_batches_supplier_id").on(table.supplierId),
    batchIdx: index("idx_batches_batch_number").on(table.batchNumber),
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete("restrict"),
    supplierFk: foreignKey({
      columns: [table.supplierId],
      foreignColumns: [suppliers.id],
    }).onDelete("set null"),
  })
);
