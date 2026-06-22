import LogoutButton from "@/components/LogOutButton";

export default function AdminHeader() {
  return (
    <header className="p-6 border-b bg-white flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-800">
        Panneau d'administration
      </h1>
      <LogoutButton />
    </header>
  );
}
