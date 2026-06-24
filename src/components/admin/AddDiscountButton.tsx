"use client";

import { useState } from "react";
import { AddDiscountForm } from "@/components/admin/forms/AddDiscountForm";

type Props = {
  categories: { id: string; label: string }[];
  subcategories: { id: string; label: string }[];
  services: { id: string; label: string }[];
};

export function AddDiscountButton({
  categories,
  subcategories,
  services,
}: Props) {
  const [state, setState] = useState(false);

  return (
    <>
      <button
        onClick={() => setState(true)}
        className="absolute right-0 bg-slate-800 text-white px-6 py-3 rounded-full shadow-md hover:bg-slate-700 transition-all font-bold flex items-center gap-2"
      >
        <span className="text-xl">+</span> Ajouter une promotion
      </button>

      {state && (
        <AddDiscountForm
          onClose={() => setState(false)}
          categories={categories}
          subcategories={subcategories}
          services={services}
        />
      )}
    </>
  );
}
