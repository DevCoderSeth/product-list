// app/api/system/roles/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/models/client";
import { roles } from "@/app/models/schema";

// GET all roles
export async function GET() {
  try {
    const rolesList = await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
      })
      .from(roles);

    return NextResponse.json(rolesList, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}
