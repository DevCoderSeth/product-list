import { NextResponse } from "next/server";
import { db } from "@/app/models/client";
import { admins, roles } from "@/app/models/schema";
import { eq } from "drizzle-orm";

// GET all admins
export async function GET() {
  try {
    // Join with roles table to get role name
    const adminsList = await db
      .select({
        id: admins.id,
        first_name: admins.firstName,
        last_name: admins.lastName,
        email: admins.email,
        role_id: admins.roleId,
        role_name: roles.name,
        created_at: admins.createdAt,
        updated_at: admins.updatedAt,
      })
      .from(admins)
      .leftJoin(roles, eq(admins.roleId, roles.id));

    return NextResponse.json(adminsList, { status: 200 });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
