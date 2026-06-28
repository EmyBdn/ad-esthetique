"use client";

import { deleteCategory } from "@/actions/categoryActions";
import Link from "next/link";
import { Category } from "@/../prisma/generated/prisma/client";
import { useState } from "react";
import { UpdateCategoryForm } from "@/components/admin/forms/UpdateCategoryForm";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import Image from "next/image";
import { useSortable } from "@dnd-kit/react/sortable";
import DragIcon from "@/components/admin/icons/DragIcon";

export default function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { ref, handleRef } = useSortable({
    id: category.id,
    index,
  });

  return (
    <div
      ref={ref}
      key={category.id}
      className="group relative transition-all hover:-translate-y-1"
    >
      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <button
          ref={handleRef}
          title="Déplacer"
          className="flex items-center justify-center rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:bg-[#FAF8F4] hover:text-[#394B39] active:cursor-grabbing cursor-grab"
        >
          <DragIcon />
        </button>
      </div>

      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button
          onClick={() => setModalIsOpen(true)}
          title="Modifier la catégorie"
          className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:bg-[#B7D8A8]/30 hover:text-[#394B39] hover:scale-110"
        >
          <EditIcon />
        </button>

        <button
          title="Supprimer la catégorie"
          className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:bg-red-50 hover:text-red-600 hover:scale-110"
          onClick={() => {
            const confirmed = window.confirm(
              "Supprimer définitivement cette catégorie ?",
            );

            if (!confirmed) return;

            deleteCategory(category.id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>

      <Link
        href={`/admin/dashboard/${category.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
      >
        <div className="relative aspect-video overflow-hidden bg-[#FAF8F4]">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.label}
              fill
              className="object-cover transition duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs italic text-[#1A2F1A]/40">
              Aucune image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-center font-serif text-2xl leading-none tracking-tight text-[#394B39] transition-colors">
            {category.label}
          </h3>

          {category.description && (
            <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-[#1A2F1A]/70">
              {category.description}
            </p>
          )}
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
