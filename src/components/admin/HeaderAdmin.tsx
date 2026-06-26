import LogoutButton from "@/components/LogOutButton";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="p-6 border-b bg-white flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-800">
        Panneau d'administration
      </h1>
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/dashboard">Prestations</Link>
        <Link href="/admin/dashboard/discounts">Promotions</Link>
        <LogoutButton />
      </div>
    </header>
  );
}
