import {
  mysqlTable,
  serial,
  varchar,
  decimal,
  json,
  timestamp,
  index,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: decimal("sale_price", { precision: 10, scale: 2 }),
    unit: varchar("unit", { length: 50 }).default("unit").notNull(),
    images: json("images").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    nameIdx: index("idx_products_name").on(table.name),
    categoryIdx: index("idx_products_category").on(table.category),
  })
);
