import AdminHeader from "@/app/components/admin/HeaderAdmin";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
