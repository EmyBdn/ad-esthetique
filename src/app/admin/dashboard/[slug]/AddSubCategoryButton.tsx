"use client";

import { useState } from "react";
import { AddSubCategoryForm } from "@/app/components/admin/form/subcategory/AddSubCategoryForm";
import { Category } from "@prisma/client";

type Props = {
  category: Category;
};
export function AddSubCategoryButton({ category }: Props) {
  const [state, setState] = useState(false);

  return (
    <>
      <button
        onClick={() => setState(true)}
        className="absolute right-0 bg-slate-800 text-black px-6 py-3 rounded-full shadow-md hover:bg-slate-700 transition-all font-bold flex items-center gap-2"
      >
        <span className="text-xl">+</span> Ajouter une sous-catégorie
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
