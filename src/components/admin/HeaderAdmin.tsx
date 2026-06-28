import LogoutButton from "@/components/LogOutButton";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="border-b border-[#394B39]/10 bg-white px-6 py-5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-2xl text-[#394B39]">
          Panneau d'administration
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#394B39]">
          <Link
            href="/admin/dashboard"
            className="transition hover:text-[#1A2F1A]/60"
          >
            Prestations
          </Link>

          <Link
            href="/admin/dashboard/discounts"
            className="transition hover:text-[#1A2F1A]/60"
          >
            Promotions
          </Link>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
