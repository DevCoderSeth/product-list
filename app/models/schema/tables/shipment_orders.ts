import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { shipments } from "./shipments";
import { orders } from "./orders";

export const shipmentOrders = mysqlTable(
  "shipment_orders",
  {
    id: serial("id").primaryKey(),
    shipmentId: int("shipment_id").notNull(),
    orderId: int("order_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    shipmentOrderIdx: index("idx_shipment_orders").on(
      table.shipmentId,
      table.orderId
    ),
    shipmentFk: foreignKey({
      columns: [table.shipmentId],
      foreignColumns: [shipments.id],
    }).onDelete("cascade"),
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete("cascade"),
  })
);
