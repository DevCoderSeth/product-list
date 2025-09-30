// app/models/schema/drizzle/scripts/create-db.ts

import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function createDatabase() {
  if (!process.env.DB_DATABASE) {
    throw new Error("DB_DATABASE environment variable is not set");
  }

  console.log("Environment variables:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || "(empty)",
    database: process.env.DB_DATABASE,
  });

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``
  );
  console.log("Database created or already exists.");
  await connection.end();
}

createDatabase().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
