import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  text,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const suppliers = mysqlTable(
  "suppliers",
  {
    id: serial("id").primaryKey(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    contactFirstName: varchar("contact_first_name", { length: 255 }),
    contactLastName: varchar("contact_last_name", { length: 255 }),
    email: varchar("email", { length: 191 }),
    phone: varchar("phone", { length: 50 }),
    address: text("address"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    companyNameIdx: index("idx_suppliers_company_name").on(table.companyName),
    emailIdx: uniqueIndex("idx_suppliers_email").on(table.email),
  })
);
