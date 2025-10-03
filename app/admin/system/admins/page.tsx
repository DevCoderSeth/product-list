// app/admin/system/admins.tsx
"use client";

import { adminColumns } from "@/app/configs/tables/admins";
import { DataTable } from "@/app/views/admin/DataTable";
import React, { useState } from "react";

// Temporary type definition - this should match your AdminDisplay type
interface AdminDisplay {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role_id: number;
  role_name?: string;
  created_at: Date;
  updated_at: Date;
}

const Admins = () => {
  const [admins, setAdmins] = useState<AdminDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch admins data
  React.useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/system/admins");
        if (!response.ok) throw new Error("Failed to fetch admins");
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (id: number | string) => {
    console.log("Edit admin:", id);
    // TODO: Implement edit functionality
    // You can navigate to an edit page or open a modal
  };

  const handleView = (row: AdminDisplay) => {
    return `/admins/${row.id}`;
  };

  return (
    <div className="mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admins</h1>
        <p className="text-sm text-gray-600 mt-1">
          View and manage system administrators
        </p>
      </div>

      <DataTable
        columns={adminColumns}
        data={admins}
        loading={loading}
        showActions={true}
        showView={true}
        skeletonRows={2}
        addButtonLabel="Add Admin"
        showDelete={false}
        showSearch={true}
        showPagination={true}
        getViewUrl={handleView}
        onEdit={handleEdit}
        hiddenColumns={["role_id"]}
      />
    </div>
  );
};

export default Admins;
