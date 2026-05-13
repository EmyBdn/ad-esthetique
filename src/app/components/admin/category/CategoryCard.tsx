"use client";

import { deleteCategory } from "@/app/actions/categoryActions";
import Link from "next/link";
import { Category } from "@prisma/client";
import { useState } from "react";
import { UpdateCategoryForm } from "@/app/components/admin/form/category/UpdateCategoryForm";
import { EditIcon } from "@/app/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/app/components/admin/icons/DeleteIcon";
export default function CategoryCard({ category }: { category: Category }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div key={category.id} className="relative group">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setModalIsOpen(true)}
          title="Modifier la catégorie"
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:scale-110 transition-all"
        >
          <EditIcon />
        </button>
        <button
          title="Supprimer la catégorie"
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-red-600 hover:scale-110 transition-all"
          onClick={() => deleteCategory(category.id)}
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Carte cliquable pour descendre dans les sous-catégories */}
      <Link
        href={`/admin/dashboard/${category.slug}`}
        className="block overflow-hidden rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <div className="aspect-video overflow-hidden bg-gray-100">
          {category.image ? (
            <img
              src={category.image}
              alt={category.label}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-xs italic">
              Aucune image
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-xl text-gray-800 group-hover:text-pink-600 transition-colors">
            {category.label}
          </h3>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            Gérer le contenu
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </p>
        </div>
      </Link>

      {modalIsOpen && (
        <UpdateCategoryForm
          category={category}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </div>
  );
}
