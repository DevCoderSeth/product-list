import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { customerAttributes } from "./customer_attributes";

export const customerAttributesLinks = mysqlTable(
  "customer_attributes_links",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    attributeId: int("attribute_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    customerAttributeIdx: index("idx_customer_attributes_links").on(
      table.customerId,
      table.attributeId
    ),
    customerFk: foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
    }).onDelete("cascade"),
    attributeFk: foreignKey({
      columns: [table.attributeId],
      foreignColumns: [customerAttributes.id],
    }).onDelete("cascade"),
  })
);
