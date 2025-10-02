// app/models/interactions/admin.ts
import { db } from "@/app/models/client";
import { eq } from "drizzle-orm";
import { admins } from "../schema";
import { BaseModel } from "@/app/lib/server_utils";
import type { QueryResult } from "mysql2";

export type Admin = typeof admins.$inferSelect;

export class AdminModel implements BaseModel<Admin> {
  async findByEmail(email: string): Promise<Admin[]> {
    return db.select().from(admins).where(eq(admins.email, email)).limit(1);
  }

  async findById(id: number): Promise<Admin[]> {
    return db.select().from(admins).where(eq(admins.id, id)).limit(1);
  }

  async create(data: Omit<Admin, "id">): Promise<QueryResult> {
    const result = await db.insert(admins).values(data).execute();
    return result as unknown as QueryResult;
  }

  async update(id: number, data: Partial<Admin>): Promise<QueryResult> {
    const result = await db
      .update(admins)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(admins.id, id))
      .execute();
    return result as unknown as QueryResult;
  }

  async delete(id: number): Promise<QueryResult> {
    const result = await db.delete(admins).where(eq(admins.id, id)).execute();
    return result as unknown as QueryResult;
  }
}
