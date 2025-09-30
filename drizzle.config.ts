import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./app/models/schema/index.ts",
  out: "./app/models/schema/drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE ?? "shop_db",
  },
  verbose: true,
});
