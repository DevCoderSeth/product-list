import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  index,
  foreignKey,
  mysqlEnum,
  boolean,
} from "drizzle-orm/mysql-core";
import { locations } from "./locations";
import { fieldTeams } from "./field_teams";

export const shipments = mysqlTable(
  "shipments",
  {
    id: serial("id").primaryKey(),
    fulfillmentType: mysqlEnum("fulfillment_type", ["delivery", "pickup"])
      .notNull()
      .default("delivery"),
    locationId: int("location_id"),
    processedBy: int("processed_by"), // Field team that processed the order
    carrier: varchar("carrier", { length: 100 }),
    trackingNumber: varchar("tracking_number", { length: 100 }),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    shippedAt: timestamp("shipped_at"),
    deliveredAt: timestamp("delivered_at"),
    promisedDeliveryBy: timestamp("promised_delivery_by"), // Expected delivery date
    isDelayed: boolean("is_delayed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    locationIdx: index("idx_shipments_location_id").on(table.locationId),
    processedByIdx: index("idx_shipments_processed_by").on(table.processedBy),
    locationFk: foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
    }).onDelete("set null"),
    processedByFk: foreignKey({
      columns: [table.processedBy],
      foreignColumns: [fieldTeams.id],
    }).onDelete("set null"),
  })
);
