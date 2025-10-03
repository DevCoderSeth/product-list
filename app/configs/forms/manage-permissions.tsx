// Define the form data shape
export interface PermissionFormData {
  name: string;
  description?: string;
}

export const permissionFormSteps = [
  {
    title: "Manage Permission",
    fields: [
      {
        type: "text" as const,
        name: "name",
        label: "Permission Name",
        placeholder: "Enter permission name (e.g., products.view)",
        validation: {
          required: "Permission name is required",
          minLength: {
            value: 2,
            message: "Permission name must be at least 2 characters",
          },
          maxLength: {
            value: 100,
            message: "Permission name cannot exceed 100 characters",
          },
          pattern: {
            value: /^[a-z0-9]+\.[a-z]+$/i,
            message:
              "Permission name must be in the format 'resource.action' (e.g., products.view)",
          },
        },
      },
      {
        type: "textarea" as const,
        name: "description",
        label: "Description",
        placeholder: "Enter permission description",
        validation: {
          maxLength: {
            value: 500,
            message: "Description cannot exceed 500 characters",
          },
        },
      },
    ],
  },
];
