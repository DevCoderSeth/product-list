// app/lib/server_utils.ts
import { QueryResult } from "mysql2";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { AdminController } from "@/app/controllers/admin";
import type { Admin } from "@/app/models/interactions/admin";

export interface BaseModel<T> {
  create: (data: Omit<T, "id">) => Promise<QueryResult>;
  update: (id: number, data: Partial<T>) => Promise<QueryResult>;
  delete: (id: number) => Promise<QueryResult>;
}

export interface BaseController<T> {
  validateCreate?: (data: Omit<T, "id">) => Promise<void> | void;
  validateUpdate?: (id: number, data: Partial<T>) => Promise<void> | void;
  validateDelete?: (id: number) => Promise<void> | void;
}

export async function createRecord<T>(
  model: BaseModel<T>,
  controller: BaseController<T> | undefined,
  data: Omit<T, "id">
): Promise<QueryResult> {
  if (controller?.validateCreate) {
    await controller.validateCreate(data);
  }
  return model.create(data);
}

export async function updateRecord<T>(
  model: BaseModel<T>,
  controller: BaseController<T> | undefined,
  id: number,
  data: Partial<T>
): Promise<QueryResult> {
  if (controller?.validateUpdate) {
    await controller.validateUpdate(id, data);
  }
  return model.update(id, data);
}

export async function deleteRecord<T>(
  model: BaseModel<T>,
  controller: BaseController<T> | undefined,
  id: number
): Promise<QueryResult> {
  if (controller?.validateDelete) {
    await controller.validateDelete(id);
  }
  return model.delete(id);
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-prod"
);

export async function signInRecord(data: {
  email: string;
  password: string;
}): Promise<{ success: true; userId: number }> {
  const controller = new AdminController();
  const user: Admin = await controller.validateSignIn(data);

  const token = await new SignJWT({ userId: user.id, roleId: user.roleId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("20m")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 20 * 60,
    path: "/",
  });

  return { success: true, userId: user.id };
}
