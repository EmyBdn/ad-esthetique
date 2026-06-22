import AdminHeader from "@/components/admin/HeaderAdmin";
import React from "react";
import { auth } from "@/../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
