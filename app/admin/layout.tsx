"use client";
import React, { useState } from "react";
import TopNav from "../views/admin/TopNav";
import SideNav from "../views/admin/SideNav";
import BottomNav from "../views/admin/BottomNav";
import DashboardFooter from "../views/admin/AdminFooter";
import TopBar from "../views/admin/TopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
  navLocation?: "top" | "side";
  serviceKey?: "admin";
}

const AdminLayout = ({
  children,
  navLocation = "side",
  serviceKey = "admin",
}: AdminLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile & Tablet: Always show SideNav. Desktop: Show based on navLocation */}
      <div className="md:block lg:hidden">
        <SideNav
          serviceKey={serviceKey}
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Desktop only navigation */}
      <div className="hidden lg:block">
        {navLocation === "top" ? (
          <TopNav serviceKey={serviceKey} />
        ) : (
          <SideNav
            serviceKey={serviceKey}
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
          />
        )}
      </div>

      <div className="flex-1">
        <main
          className={`min-h-[91vh] flex-1 transition-all duration-300 ${
            navLocation === "top" ? "bg-white lg:pt-16" : "bg-secondary"
          } ${
            // Tablet: Always use SideNav padding
            isExpanded ? "md:pl-64" : "md:pl-16"
          } ${
            // Desktop: Reset tablet padding, then apply based on navLocation
            navLocation === "top"
              ? "lg:pl-0"
              : isExpanded
              ? "lg:pl-64"
              : "lg:pl-16"
          }`}
        >
          {/* TopBar: Show on sm/md, hide on lg when navLocation is top */}
          {navLocation === "side" ? (
            <TopBar />
          ) : (
            <div className="block lg:hidden">
              <TopBar />
            </div>
          )}
          <div className="pl-4">{children}</div>
        </main>
      </div>

      {/* Bottom Nav for mobile only */}
      <BottomNav serviceKey={serviceKey} />

      <DashboardFooter
        className={`transition-all duration-300 ${
          // Tablet: Always use SideNav padding
          isExpanded ? "md:pl-64" : "md:pl-16"
        } ${
          // Desktop: Reset tablet padding, then apply based on navLocation
          navLocation === "top"
            ? "lg:pl-0"
            : isExpanded
            ? "lg:pl-64"
            : "lg:pl-16"
        }`}
      />
    </div>
  );
};

export default AdminLayout;
