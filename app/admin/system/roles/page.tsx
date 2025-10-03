// app/admin/system/roles.tsx
"use client";

import { roleColumns } from "@/app/configs/tables/roles";
import { DataTable } from "@/app/views/admin/DataTable";
import React, { useState } from "react";

// Temporary type definition - this should match your RoleDisplay type
interface RoleDisplay {
  id: number;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

const Roles = () => {
  const [roles, setRoles] = useState<RoleDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch roles data
  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/system/roles");
        if (!response.ok) throw new Error("Failed to fetch roles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleEdit = (id: number | string) => {
    console.log("Edit role:", id);
    // TODO: Implement edit functionality
    // You can navigate to an edit page or open a modal
    // For roles, this would typically open a form to edit name, description, and permissions
  };

  const handleView = (row: RoleDisplay) => {
    return `/roles/${row.id}`;
  };

  return (
    <div className="mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and manage system roles and permissions
        </p>
      </div>

      <DataTable
        columns={roleColumns}
        data={roles}
        loading={loading}
        showActions={true}
        showView={true}
        skeletonRows={2}
        addButtonLabel="Add Role"
        showDelete={false}
        showSearch={true}
        showPagination={true}
        getViewUrl={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Roles;
