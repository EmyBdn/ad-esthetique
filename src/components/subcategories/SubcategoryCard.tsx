"use client";

import {
  Subcategory,
  Service,
  Discount,
} from "@/../prisma/generated/prisma/client";
import { deleteSubCategory } from "@/actions/subcategoryActions";
import { updateServicesPosition } from "@/actions/serviceActions";
import ServiceDetails from "@/components/services/ServiceDetails";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { useEffect, useState, useTransition } from "react";
import { UpdateSubCategoryForm } from "@/components/admin/forms/UpdateSubCategoryForm";
import { AddServiceForm } from "@/components/admin/forms/AddServiceForm";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import DragIcon from "@/components/admin/icons/DragIcon";
import Image from "next/image";
import { useSortable } from "@dnd-kit/react/sortable";

type ServiceWithDiscount = Service & {
  discount: Discount | null;
};

type Props = {
  subcategory: Subcategory & {
    discount: Discount | null;
  };
  services: ServiceWithDiscount[];
  categoryDiscount: Discount | null;
  index: number;
};

export default function SubcategoryCard({
  subcategory,
  services,
  categoryDiscount,
  index,
}: Props) {
  const [updateSubCategoryIsOpen, setUpdateSubCategoryIsOpen] = useState(false);

  const [addServiceIsOpen, setAddServiceIsOpen] = useState(false);

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  const [orderedServices, setOrderedServices] = useState(services);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setOrderedServices(services);
  }, [services]);

  const { ref, handleRef } = useSortable({
    id: subcategory.id,
    index,
  });

  function moveService(serviceId: string, direction: "up" | "down") {
    const currentIndex = orderedServices.findIndex(
      (service) => service.id === serviceId,
    );

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= orderedServices.length) {
      return;
    }

    const nextServices = [...orderedServices];

    [nextServices[currentIndex], nextServices[targetIndex]] = [
      nextServices[targetIndex],
      nextServices[currentIndex],
    ];

    setOrderedServices(nextServices);

    startTransition(async () => {
      const result = await updateServicesPosition(
        nextServices.map((service) => service.id),
      );

      if (!result.success) {
        setOrderedServices(orderedServices);
      }
    });
  }

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
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={subcategory.image}
            alt={subcategory.label}
            fill
            className="object-cover"
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
          {orderedServices.map((service, serviceIndex) => {
            const isSelected = selectedServiceId === service.id;

            return (
              <div
                key={service.id}
                onClick={() =>
                  setSelectedServiceId(
                    selectedServiceId === service.id ? null : service.id,
                  )
                }
                className={`relative rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-amber-300 ring-offset-2"
                    : "ring-1 ring-transparent"
                }`}
              >
                <ServiceDetails
                  service={service}
                  categoryDiscount={categoryDiscount}
                  subcategoryDiscount={subcategory.discount}
                />

                {isSelected && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    <button
                      type="button"
                      disabled={serviceIndex === 0 || isPending}
                      onClick={(event) => {
                        event.stopPropagation();
                        moveService(service.id, "up");
                      }}
                      className="rounded-full bg-white shadow px-2 py-1 disabled:opacity-30"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      disabled={
                        serviceIndex === orderedServices.length - 1 || isPending
                      }
                      onClick={(event) => {
                        event.stopPropagation();
                        moveService(service.id, "down");
                      }}
                      className="rounded-full bg-white shadow px-2 py-1 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
