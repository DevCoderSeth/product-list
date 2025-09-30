import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { admins } from "./admins";
import { locations } from "./locations";

export const fieldTeams = mysqlTable(
  "field_teams",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    supervisorId: int("supervisor_id").notNull(),
    locationId: int("location_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    supervisorIdx: index("idx_field_teams_supervisor_id").on(
      table.supervisorId
    ),
    locationIdx: index("idx_field_teams_location_id").on(table.locationId),
    supervisorFk: foreignKey({
      columns: [table.supervisorId],
      foreignColumns: [admins.id],
    }).onDelete("restrict"),
    locationFk: foreignKey({
      columns: [table.locationId],
      foreignColumns: [locations.id],
    }).onDelete("restrict"),
  })
);
