"use client";

import { permissionColumns } from "@/app/configs/tables/permissions";
import { PermissionDisplay } from "@/app/types/admins";
import { DataTable } from "@/app/views/admin/DataTable";
import React, { useState } from "react";

const Permissions = () => {
  const [permissions, setPermissions] = useState<PermissionDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch permissions data
  React.useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/system/permissions");
        if (!response.ok) throw new Error("Failed to fetch permissions");
        const data = await response.json();
        setPermissions(data);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const handleEdit = (id: number | string) => {
    console.log("Edit permission:", id);
    // TODO: Implement edit functionality
    // Navigate to an edit page or open a modal with the permission form
  };

  const handleView = (row: PermissionDisplay) => {
    return `/permissions/${row.id}`;
  };

  return (
    <div className="mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Permissions</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and manage system permissions
        </p>
      </div>

      <DataTable
        columns={permissionColumns}
        data={permissions}
        loading={loading}
        showActions={true}
        showView={true}
        skeletonRows={8}
        addButtonLabel="Add Permission"
        showDelete={false}
        showSearch={true}
        showPagination={true}
        getViewUrl={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Permissions;
