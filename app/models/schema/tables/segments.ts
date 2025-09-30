import {
  mysqlTable,
  serial,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const segments = mysqlTable(
  "segments",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
  },
  (table) => ({
    nameIdx: uniqueIndex("idx_segments_name").on(table.name),
  })
);
