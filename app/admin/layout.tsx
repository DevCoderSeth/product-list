// app/admin/layout.tsx
import React from "react";
import { getCurrentUser } from "@/app/lib/auth";
import AdminLayout from "../views/admin/AdminLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser();

  return (
    <AdminLayout user={user} navLocation="side" serviceKey="admin">
      {children}
    </AdminLayout>
  );
}
