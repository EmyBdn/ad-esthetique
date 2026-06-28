"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Identifiants incorrects.");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="mx-auto mt-20 max-w-md rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-8 shadow-sm">
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
        Administration
      </p>

      <h2 className="mb-8 text-center font-serif text-3xl text-[#394B39]">
        Connexion
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#394B39]">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#394B39]/10 bg-white px-4 py-3 text-[#1A2F1A] outline-none transition focus:border-[#394B39]/40 focus:ring-2 focus:ring-[#B7D8A8]/40"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#394B39]">
            Mot de passe
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#394B39]/10 bg-white px-4 py-3 text-[#1A2F1A] outline-none transition focus:border-[#394B39]/40 focus:ring-2 focus:ring-[#B7D8A8]/40"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#394B39] px-6 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A2F1A]"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
