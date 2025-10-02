// app/models/schema/drizzle/scripts/seed.ts
import { db } from "@/app/models/client";
import { eq, sql } from "drizzle-orm";
import { roles } from "../../tables/roles";
import { permissions } from "../../tables/permissions";
import { rolePermissions } from "../../tables/role_permissions";
import { admins } from "../../tables/admins";
import { hashPassword } from "@/app/lib/auth";

async function seedSystemAdmin() {
  console.log("🌱 Starting System Admin seeding...");

  try {
    // ============================================
    // STEP 1: Create System Admin Role
    // ============================================
    console.log("📋 Creating system admin role...");

    await db
      .insert(roles)
      .values({
        name: "system_admin",
        description:
          "Dev/Platform team - System & user management + read-only analytics",
      })
      .onDuplicateKeyUpdate({
        set: {
          description: sql`VALUES(description)`,
        },
      });

    const [systemRole] = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "system_admin"))
      .limit(1);

    console.log(`✅ System admin role ID: ${systemRole.id}`);

    // ============================================
    // STEP 2: Create System-Level Permissions
    // ============================================
    console.log("🔐 Creating system-level permissions...");

    const systemPermissions = [
      {
        name: "manage_admins",
        description: "Create, update, delete admin accounts",
      },
      {
        name: "manage_roles",
        description: "Create and modify roles",
      },
      {
        name: "manage_permissions",
        description: "Assign permissions to roles",
      },
      {
        name: "system_settings",
        description: "Modify system-wide configuration",
      },
      {
        name: "view_analytics",
        description: "View business performance metrics (read-only)",
      },
      {
        name: "view_reports",
        description: "Access system reports and dashboards (read-only)",
      },
    ];

    await db
      .insert(permissions)
      .values(systemPermissions)
      .onDuplicateKeyUpdate({
        set: {
          description: sql`VALUES(description)`,
        },
      });

    console.log(`✅ Created ${systemPermissions.length} system permissions`);

    // ============================================
    // STEP 3: Assign Permissions to System Admin
    // ============================================
    console.log("🔗 Assigning permissions to system admin...");

    const allPermissions = await db.select().from(permissions);
    const systemPermNames = systemPermissions.map((p) => p.name);
    const systemPerms = allPermissions.filter((p) =>
      systemPermNames.includes(p.name)
    );

    await db
      .delete(rolePermissions)
      .where(eq(rolePermissions.roleId, systemRole.id));

    await db.insert(rolePermissions).values(
      systemPerms.map((permission) => ({
        roleId: systemRole.id,
        permissionId: permission.id,
      }))
    );

    console.log(
      `✅ Assigned ${systemPerms.length} permissions to system admin`
    );

    // ============================================
    // STEP 4: Create System Admin Account
    // ============================================
    console.log("👤 Creating system admin account...");

    const SYSTEM_ADMIN_EMAIL = "netuganda.devs@gmail.com";
    const SYSTEM_ADMIN_PASSWORD = "System@2025!";

    const [existingAdmin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, SYSTEM_ADMIN_EMAIL))
      .limit(1);

    if (existingAdmin) {
      console.log("⚠️  System admin already exists. Skipping creation.");
      console.log(`   Email: ${SYSTEM_ADMIN_EMAIL}`);
    } else {
      const hashedPassword = await hashPassword(SYSTEM_ADMIN_PASSWORD);
      await db.insert(admins).values({
        firstName: "System",
        lastName: "Administrator",
        email: SYSTEM_ADMIN_EMAIL,
        password: hashedPassword,
        roleId: systemRole.id,
      });

      console.log("✅ System admin created successfully!");
      console.log("\n" + "=".repeat(60));
      console.log("🔑 SYSTEM ADMIN CREDENTIALS");
      console.log("=".repeat(60));
      console.log(`Email:    ${SYSTEM_ADMIN_EMAIL}`);
      console.log(`Password: ${SYSTEM_ADMIN_PASSWORD}`);
      console.log("=".repeat(60));
      console.log("\n📌 CAPABILITIES:");
      console.log("   ✓ Manage admin accounts");
      console.log("   ✓ Manage roles & permissions");
      console.log("   ✓ View analytics & reports (read-only)");
      console.log("   ✓ System configuration");
      console.log("\n🎯 NEXT STEPS:");
      console.log("   1. Login with system admin credentials");
      console.log("   2. Create business roles and permissions");
      console.log("   3. Create super_admin for business operations");
      console.log("=".repeat(60) + "\n");
    }

    console.log("✅ System admin seeding completed!");
    return true;
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

seedSystemAdmin()
  .then(() => {
    console.log("🎉 Seeding finished!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
