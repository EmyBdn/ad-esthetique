"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          callbackUrl: "/admin",
        })
      }
      className="inline-flex items-center justify-center rounded-full border border-[#394B39]/15 bg-white px-5 py-2 text-sm font-semibold text-[#394B39] transition-all duration-200 hover:border-[#B7D8A8] hover:bg-[#B7D8A8]/20 hover:text-[#394B39]"
    >
      Déconnexion
    </button>
  );
}
