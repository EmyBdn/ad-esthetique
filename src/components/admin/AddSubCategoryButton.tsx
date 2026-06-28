"use client";

import { useState } from "react";
import { Category } from "@/../prisma/generated/prisma/client";
import { AddSubCategoryForm } from "@/components/admin/forms/AddSubCategoryForm";

type Props = {
  category: Category;
};

export function AddSubCategoryButton({ category }: Props) {
  const [state, setState] = useState(false);

  return (
    <>
      <button
        onClick={() => setState(true)}
        className="absolute right-6 top-12 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#394B39] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B7D8A8] hover:text-[#394B39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A2F1A]"
      >
        <span className="text-lg leading-none">+</span>
        Ajouter une sous-catégorie
      </button>

      {state && (
        <AddSubCategoryForm
          category={category}
          onClose={() => setState(false)}
        />
      )}
    </>
  );
}
