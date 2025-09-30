// app/models/schema/drizzle/scripts/drop-db.ts
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function dropDatabase() {
  if (!process.env.DB_DATABASE) {
    throw new Error("DB_DATABASE environment variable is not set");
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
  });

  await connection.query(
    `DROP DATABASE IF EXISTS \`${process.env.DB_DATABASE}\``
  );
  console.log("Database dropped.");
  await connection.end();
}

dropDatabase().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
