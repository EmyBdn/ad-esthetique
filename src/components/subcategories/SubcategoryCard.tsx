"use client";

import { Subcategory, Service } from "@prisma/client";
import { deleteSubCategory } from "@/actions/subcategoryActions";
import ServiceDetails from "@/components/services/ServiceDetails";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { useState } from "react";
import { UpdateSubCategoryForm } from "@/components/admin/forms/UpdateSubCategoryForm";
import { AddServiceForm } from "@/components/admin/forms/AddServiceForm";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import DragIcon from "@/components/admin/icons/DragIcon";
import Image from "next/image";
import { useSortable } from "@dnd-kit/react/sortable";

type Props = {
  subcategory: Subcategory;
  services: Service[];
  index: number;
};

export default function SubcategoryCard({
  subcategory,
  services,
  index,
}: Props) {
  const [updateSubCategoryIsOpen, setUpdateSubCategoryIsOpen] = useState(false);
  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false);

  const { ref, handleRef } = useSortable({
    id: subcategory.id,
    index,
  });

  return (
    <div
      ref={ref}
      className="relative flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="absolute top-4 left-4 z-10">
        <button
          ref={handleRef}
          title="Déplacer"
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          <DragIcon />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setUpdateSubCategoryIsOpen(true)}
          title="Modifier la sous-catégorie"
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:scale-110 transition-all"
        >
          <EditIcon />
        </button>

        <button
          title="Supprimer la sous-catégorie"
          className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-red-600 hover:scale-110 transition-all"
          onClick={() => deleteSubCategory(subcategory.id)}
        >
          <DeleteIcon />
        </button>
      </div>

      {subcategory.image && (
        <div className="h-48 w-full overflow-hidden">
          <Image
            src={subcategory.image}
            alt={subcategory.label}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-8">
        <h2 className="text-2xl font-serif text-center text-slate-700 mb-2">
          {subcategory.label}
        </h2>

        <p>{subcategory.description}</p>

        <div className="w-16 h-0.5 bg-amber-200 mx-auto mb-8"></div>

        <div className="space-y-6">
          {services.map((service) => (
            <ServiceDetails key={service.id} service={service} />
          ))}
        </div>

        <button onClick={() => setAddServiceIsOpen(true)}>
          Ajouter un service
        </button>
      </div>

      {updateSubCategoryIsOpen && (
        <UpdateSubCategoryForm
          subcategory={subcategory}
          onClose={() => setUpdateSubCategoryIsOpen(false)}
        />
      )}

      {addServiceIsOpen && (
        <AddServiceForm
          subcategory={subcategory}
          onClose={() => setAddServiceIsOpen(false)}
        />
      )}
    </div>
  );
}
