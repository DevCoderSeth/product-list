import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { batches } from "./batches";
import { locations } from "./locations";

export const stockLevels = mysqlTable(
  "stock_levels",
  {
    id: serial("id").primaryKey(),
    batchId: int("batch_id").notNull(),
    locationId: int("location_id").notNull(),
    quantity: int("quantity").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    batchIdx: index("idx_stock_levels_batch_id").on(table.batchId),
    locationIdx: index("idx_stock_levels_location_id").on(table.locationId),
    batchFk: foreignKey({
      columns: [table.batchId],
      foreignColumns: [batches.id],
    }).onDelete("restrict"),
    locationFk: foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
    }).onDelete("restrict"),
  })
);
