import {
  mysqlTable,
  serial,
  decimal,
  int,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { products } from "./products";
import { suppliers } from "./suppliers";

export const productSuppliers = mysqlTable(
  "product_suppliers",
  {
    id: serial("id").primaryKey(),
    productId: int("product_id").notNull(),
    supplierId: int("supplier_id").notNull(),
    costPrice: decimal("cost_price", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => ({
    productSupplierIdx: index("idx_product_suppliers").on(
      table.productId,
      table.supplierId
    ),
    productFk: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
    }).onDelete("cascade"),
    supplierFk: foreignKey({
      columns: [table.supplierId],
      foreignColumns: [suppliers.id],
    }).onDelete("cascade"),
  })
);
