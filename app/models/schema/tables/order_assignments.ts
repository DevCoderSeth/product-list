import {
  mysqlTable,
  serial,
  int,
  timestamp,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { fieldTeams } from "./field_teams";
import { orders } from "./orders";
import { admins } from "./admins";

export const orderAssignments = mysqlTable(
  "order_assignments",
  {
    id: serial("id").primaryKey(),
    orderId: int("order_id").notNull(),
    fieldTeamId: int("field_team_id").notNull(),
    assignedBy: int("assigned_by").notNull(), // Manager who assigned
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orderTeamIdx: index("idx_order_assignments").on(
      table.orderId,
      table.fieldTeamId
    ),
    orderFk: foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }).onDelete("cascade"),
    fieldTeamFk: foreignKey({
      columns: [table.fieldTeamId],
      foreignColumns: [fieldTeams.id],
    }).onDelete("restrict"),
    assignedByFk: foreignKey({
      columns: [table.assignedBy],
      foreignColumns: [admins.id],
    }).onDelete("set null"),
  })
);
