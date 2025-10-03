import { NextResponse } from "next/server";
import { db } from "@/app/models/client";
import { permissions } from "@/app/models/schema";

// GET all permissions
export async function GET() {
  try {
    const permissionsList = await db
      .select({
        id: permissions.id,
        name: permissions.name,
        description: permissions.description,
      })
      .from(permissions);

    return NextResponse.json(permissionsList, { status: 200 });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}
