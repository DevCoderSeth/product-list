import {
  LayoutDashboard,
  Settings,
  Users,
  Package,
  Factory,
  Warehouse,
  ShoppingCart,
  Truck,
  DollarSign,
  BarChart3,
  Shield,
} from "lucide-react";

export const navLinks: Record<
  string,
  {
    label: string;
    href: string;
    icon: React.ElementType;
    requiredPermission?: string;
    subLinks?: {
      label: string;
      href: string;
      requiredPermission?: string;
    }[];
  }[]
> = {
  admin: [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "System",
      href: "/admin/system",
      icon: Shield,
      requiredPermission: "manage_admins",
      subLinks: [
        {
          label: "Admins",
          href: "/admin/system/admins",
          requiredPermission: "manage_admins",
        },
        {
          label: "Roles",
          href: "/admin/system/roles",
          requiredPermission: "manage_roles",
        },
        {
          label: "Permissions",
          href: "/admin/system/permissions",
          requiredPermission: "manage_permissions",
        },
        {
          label: "Audit Logs",
          href: "/admin/system/audit-logs",
          requiredPermission: "manage_admins",
        },
      ],
    },
    {
      label: "Customers",
      href: "/admin/customers",
      icon: Users,
      requiredPermission: "manage_customers",
      subLinks: [
        {
          label: "All Customers",
          href: "/admin/customers/list",
          requiredPermission: "manage_customers",
        },
        {
          label: "Segments",
          href: "/admin/customers/segments",
          requiredPermission: "manage_customers",
        },
        {
          label: "Attributes",
          href: "/admin/customers/attributes",
          requiredPermission: "manage_customers",
        },
        {
          label: "Activity",
          href: "/admin/customers/activity",
          requiredPermission: "manage_customers",
        },
      ],
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: Package,
      requiredPermission: "view_products",
      subLinks: [
        {
          label: "Catalog",
          href: "/admin/products/catalog",
          requiredPermission: "view_products",
        },
        {
          label: "Categories",
          href: "/admin/products/categories",
          requiredPermission: "manage_products",
        },
      ],
    },
    {
      label: "Suppliers",
      href: "/admin/suppliers",
      icon: Factory,
      requiredPermission: "manage_inventory",
      subLinks: [
        {
          label: "Directory",
          href: "/admin/suppliers/list",
          requiredPermission: "manage_inventory",
        },
        {
          label: "Products",
          href: "/admin/suppliers/products",
          requiredPermission: "manage_inventory",
        },
        {
          label: "Purchase Orders",
          href: "/admin/suppliers/purchase-orders",
          requiredPermission: "manage_inventory",
        },
      ],
    },
    {
      label: "Inventory",
      href: "/admin/inventory",
      icon: Warehouse,
      requiredPermission: "view_inventory",
      subLinks: [
        {
          label: "Stock Levels",
          href: "/admin/inventory/stock-levels",
          requiredPermission: "view_inventory",
        },
        {
          label: "Batches",
          href: "/admin/inventory/batches",
          requiredPermission: "view_inventory",
        },
        {
          label: "Transfers",
          href: "/admin/inventory/transfers",
          requiredPermission: "manage_inventory",
        },
        {
          label: "Locations",
          href: "/admin/inventory/locations",
          requiredPermission: "manage_locations",
        },
      ],
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      requiredPermission: "view_orders",
      subLinks: [
        {
          label: "All Orders",
          href: "/admin/orders/all",
          requiredPermission: "view_orders",
        },
        {
          label: "Pending",
          href: "/admin/orders/pending",
          requiredPermission: "verify_orders",
        },
        {
          label: "Processing",
          href: "/admin/orders/processing",
          requiredPermission: "manage_orders",
        },
        {
          label: "Assignments",
          href: "/admin/orders/assignments",
          requiredPermission: "manage_orders",
        },
      ],
    },
    {
      label: "Shipments",
      href: "/admin/shipments",
      icon: Truck,
      requiredPermission: "manage_shipments",
      subLinks: [
        {
          label: "Deliveries",
          href: "/admin/shipments/deliveries",
          requiredPermission: "manage_shipments",
        },
        {
          label: "Pickups",
          href: "/admin/shipments/pickups",
          requiredPermission: "manage_shipments",
        },
        {
          label: "Tracking",
          href: "/admin/shipments/tracking",
          requiredPermission: "manage_shipments",
        },
        {
          label: "Field Teams",
          href: "/admin/shipments/field-teams",
          requiredPermission: "manage_field_teams",
        },
      ],
    },
    {
      label: "Accounting",
      href: "/admin/accounting",
      icon: DollarSign,
      requiredPermission: "view_payments",
      subLinks: [
        {
          label: "Payments",
          href: "/admin/accounting/payments",
          requiredPermission: "view_payments",
        },
        {
          label: "Transactions",
          href: "/admin/accounting/transactions",
          requiredPermission: "view_payments",
        },
        {
          label: "Installments",
          href: "/admin/accounting/installments",
          requiredPermission: "view_payments",
        },
        {
          label: "Reports",
          href: "/admin/accounting/reports",
          requiredPermission: "view_payments",
        },
      ],
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      requiredPermission: "view_analytics",
      subLinks: [
        {
          label: "Sales",
          href: "/admin/analytics/sales",
          requiredPermission: "view_analytics",
        },
        {
          label: "Inventory",
          href: "/admin/analytics/inventory",
          requiredPermission: "view_analytics",
        },
        {
          label: "Customers",
          href: "/admin/analytics/customers",
          requiredPermission: "view_analytics",
        },
        {
          label: "Performance",
          href: "/admin/analytics/performance",
          requiredPermission: "view_analytics",
        },
      ],
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      subLinks: [
        {
          label: "General",
          href: "/admin/settings/general",
          requiredPermission: "system_settings",
        },
        {
          label: "Notifications",
          href: "/admin/settings/notifications",
          requiredPermission: "system_settings",
        },
      ],
    },
  ],
};
