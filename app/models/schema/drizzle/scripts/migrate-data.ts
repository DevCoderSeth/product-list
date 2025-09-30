// app/models/schema/drizzle/scripts/migrate-data.ts
import { sql } from "drizzle-orm";
import { customers } from "../../tables/customers";
import { admins } from "../../tables/admins";
import { db } from "@/app/models/client";

async function migrateData() {
  // Split customers.name into firstName and lastName
  await db
    .update(customers)
    .set({
      firstName: sql`SUBSTRING_INDEX(name, ' ', 1)`,
      lastName: sql`CASE WHEN SUBSTRING_INDEX(name, ' ', -1) = SUBSTRING_INDEX(name, ' ', 1) THEN '' ELSE SUBSTRING_INDEX(name, ' ', -1) END`,
    })
    .execute();

  // Split admins.name into firstName and lastName
  await db
    .update(admins)
    .set({
      firstName: sql`SUBSTRING_INDEX(name, ' ', 1)`,
      lastName: sql`CASE WHEN SUBSTRING_INDEX(name, ' ', -1) = SUBSTRING_INDEX(name, ' ', 1) THEN '' ELSE SUBSTRING_INDEX(name, ' ', -1) END`,
    })
    .execute();

  console.log("Data migrated.");
}

migrateData().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
