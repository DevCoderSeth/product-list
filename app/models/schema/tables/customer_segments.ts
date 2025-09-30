import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { segments } from "./segments";

export const customerSegments = mysqlTable(
  "customer_segments",
  {
    id: serial("id").primaryKey(),
    customerId: int("customer_id").notNull(),
    segmentId: int("segment_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    customerSegmentIdx: index("idx_customer_segments").on(
      table.customerId,
      table.segmentId
    ),
    customerFk: foreignKey({
      columns: [table.customerId],
      foreignColumns: [customers.id],
    }).onDelete("cascade"),
    segmentFk: foreignKey({
      columns: [table.segmentId],
      foreignColumns: [segments.id],
    }).onDelete("cascade"),
  })
);
