import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const admins = mysqlTable(
  "admins",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 191 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    roleId: int("role_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("idx_admins_email").on(table.email),
    roleIdx: index("idx_admins_role_id").on(table.roleId),
  })
);
