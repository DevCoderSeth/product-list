import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  text,
  uniqueIndex,
  date,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const customers = mysqlTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 191 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    gender: mysqlEnum("gender", ["male", "female"]).notNull(),
    address: text("address"),
    phone: varchar("phone", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("idx_customers_email").on(table.email),
  })
);
