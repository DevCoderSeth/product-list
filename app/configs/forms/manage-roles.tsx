// Define the shape of the permissions object for the checkboxMatrix
export type PermissionsMatrix = {
  [resource: string]: {
    [action: string]: boolean;
  };
};

// Define the form data shape
export interface RoleFormData {
  name: string;
  description?: string;
  permissions: PermissionsMatrix;
}

export const roleFormSteps = [
  {
    title: "Manage Role",
    fields: [
      {
        type: "text" as const,
        name: "name",
        label: "Role Name",
        placeholder: "Enter role name",
        validation: {
          required: "Role name is required",
          minLength: {
            value: 2,
            message: "Role name must be at least 2 characters",
          },
          maxLength: {
            value: 100,
            message: "Role name cannot exceed 100 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9\s_-]+$/,
            message:
              "Role name can only contain letters, numbers, spaces, hyphens, or underscores",
          },
        },
      },
      {
        type: "textarea" as const,
        name: "description",
        label: "Description",
        placeholder: "Enter role description",
        validation: {
          maxLength: {
            value: 500,
            message: "Description cannot exceed 500 characters",
          },
        },
      },
      {
        type: "checkboxMatrix" as const,
        name: "permissions",
        label: "Permissions",
        columns: ["View", "Create", "Edit", "Delete"],
        rows: [
          "Products",
          "Customers",
          "Orders",
          "Shipments",
          "Suppliers",
          "Locations",
          "Batches",
          "Stock Levels",
        ],
        validation: {
          validate: (value: PermissionsMatrix) => {
            const hasPermission = Object.values(value).some((row) =>
              Object.values(row).some((checked) => checked === true)
            );
            return hasPermission || "At least one permission must be selected";
          },
        },
      },
    ],
  },
];
