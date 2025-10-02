// app/lib/auth.ts
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminModel, type Admin } from "@/app/models/interactions/admin";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-prod"
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getCurrentUser(): Promise<Admin | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const decoded = payload as { userId: number; roleId: number };

    if (!decoded.userId) return null;

    const [user] = await new AdminModel().findById(decoded.userId);
    if (!user) return null;

    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
