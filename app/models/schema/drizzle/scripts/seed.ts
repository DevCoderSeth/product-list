import { db } from "@/app/models/client";
import { eq } from "drizzle-orm";
import { roles } from "../../tables/roles";
import { permissions } from "../../tables/permissions";
import { rolePermissions } from "../../tables/role_permissions";
import { admins } from "../../tables/admins";

async function seed() {
  console.log("Starting database seeding...");

  // 1. Create Roles
  console.log("Creating roles...");
  await db
    .insert(roles)
    .values([
      {
        name: "system_admin",
        description: "System-level access - User & role management only",
      },
      {
        name: "super_admin",
        description: "Business owner - Full business operations access",
      },
      {
        name: "operator_admin",
        description: "Staff/Employee - Limited business operations",
      },
    ])
    .onDuplicateKeyUpdate({ set: { name: roles.name } });

  // Get the system_admin role ID
  const [systemRole] = await db
    .select()
    .from(roles)
    .where(eq(roles.name, "system_admin"))
    .limit(1);

  console.log(`System admin role created with ID: ${systemRole.id}`);

  // 2. Create Permissions - Separated by category
  console.log("Creating permissions...");
  await db
    .insert(permissions)
    .values([
      // === SYSTEM ADMINISTRATION (for system_admin) ===
      {
        name: "manage_admins",
        description: "Create, update, delete admin accounts",
      },
      { name: "manage_roles", description: "Create and assign roles" },
      {
        name: "manage_permissions",
        description: "Assign permissions to roles",
      },
      { name: "system_settings", description: "Modify system configuration" },

      // === BUSINESS OPERATIONS (for super_admin/operator_admin) ===
      // User Management
      {
        name: "manage_customers",
        description: "View and manage customer accounts",
      },

      // Product Management
      {
        name: "manage_products",
        description: "Create, update, delete products",
      },
      { name: "view_products", description: "View product catalog" },

      // Inventory Management
      {
        name: "manage_inventory",
        description: "Manage stock levels and batches",
      },
      { name: "view_inventory", description: "View inventory levels" },

      // Order Management
      { name: "manage_orders", description: "Process and manage orders" },
      { name: "view_orders", description: "View orders" },
      { name: "verify_orders", description: "Verify and approve orders" },

      // Financial
      { name: "manage_payments", description: "Process payments and refunds" },
      { name: "view_payments", description: "View payment records" },

      // Operations
      {
        name: "manage_shipments",
        description: "Manage shipments and deliveries",
      },
      { name: "manage_field_teams", description: "Manage field teams" },
      { name: "manage_locations", description: "Manage store locations" },

      // Analytics
      { name: "view_analytics", description: "Access analytics and reports" },
    ])
    .onDuplicateKeyUpdate({ set: { name: permissions.name } });

  // 3. Assign ONLY system administration permissions to system_admin
  console.log("Assigning permissions to system admin role...");

  const systemPermissionNames = [
    "manage_admins",
    "manage_roles",
    "manage_permissions",
    "system_settings",
  ];

  const systemPermissions = await db
    .select()
    .from(permissions)
    .where(eq(permissions.name, systemPermissionNames[0])); // This is a workaround

  // Better approach: get all system permissions
  const allPermissions = await db.select().from(permissions);
  const systemPerms = allPermissions.filter((p) =>
    systemPermissionNames.includes(p.name)
  );

  await db.insert(rolePermissions).values(
    systemPerms.map((permission) => ({
      roleId: systemRole.id,
      permissionId: permission.id,
    }))
  );

  console.log(
    `Assigned ${systemPerms.length} system permissions to system admin`
  );

  // 4. Create the system admin account
  console.log("Creating system admin account...");

  const [existingAdmin] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, "admin@system.local"))
    .limit(1);

  if (existingAdmin) {
    console.log("System admin already exists. Skipping creation.");
  } else {
    await db.insert(admins).values({
      firstName: "System",
      lastName: "Administrator",
      email: "admin@system.local",
      password: "system@2025",
      roleId: systemRole.id,
    });

    console.log("System admin created successfully!");
    console.log("-----------------------------------");
    console.log("System Admin Credentials:");
    console.log("Email: admin@system.local");
    console.log("Password: system@2025");
    console.log("-----------------------------------");
    console.log("Permissions: User & Role Management ONLY");
    console.log("Next Step: Login and create your first super_admin");
  }

  console.log("Database seeding completed successfully!");
}

seed()
  .catch((error) => {
    console.error("Error during seeding:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
