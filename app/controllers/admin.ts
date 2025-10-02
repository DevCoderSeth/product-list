// app/controllers/admin.ts
import { z } from "zod";
import { comparePassword, hashPassword } from "@/app/lib/auth";
import { AdminModel, type Admin } from "@/app/models/interactions/admin";
import type { BaseController } from "@/app/lib/server_utils";

const SYSTEM_SEEDED_ADMIN_ID = 1; // ID of the initial seeded system admin (adjust if needed post-seed)

const createSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  roleId: z.number().int("Invalid role ID"),
});

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  roleId: z.number().int("Invalid role ID").optional(),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

export class AdminController implements BaseController<Admin> {
  async validateCreate(data: Omit<Admin, "id">): Promise<void> {
    createSchema.parse(data);
    data.password = await hashPassword(data.password);
    const [existing] = await new AdminModel().findByEmail(data.email);
    if (existing) {
      throw new Error("Email already exists");
    }
  }

  async validateUpdate(id: number, data: Partial<Admin>): Promise<void> {
    if (id === SYSTEM_SEEDED_ADMIN_ID) {
      throw new Error("Seeded system admin cannot be updated");
    }
    updateSchema.partial().parse(data);
    if (data.email) {
      const [existing] = await new AdminModel().findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw new Error("Email already in use");
      }
    }
    if (data.password) {
      data.password = await hashPassword(data.password as string);
    }
  }

  async validateDelete(id: number): Promise<void> {
    if (id === SYSTEM_SEEDED_ADMIN_ID) {
      throw new Error("Seeded system admin cannot be deleted");
    }
    // Additional checks: e.g., no dependencies (locations manager, etc.), but keep minimal for now
  }

  async validateSignIn(credentials: {
    email: string;
    password: string;
  }): Promise<Admin> {
    const validated = signInSchema.parse(credentials);
    const [user] = await new AdminModel().findByEmail(validated.email);
    if (!user || !(await comparePassword(validated.password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return user;
  }
}
