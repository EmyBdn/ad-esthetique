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

    if (targetIndex < 0 || targetIndex >= orderedServices.length) return;

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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="absolute left-4 top-4 z-10 flex gap-2">
        <button
          ref={handleRef}
          title="Déplacer"
          className="flex cursor-grab items-center justify-center rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:text-[#394B39] active:cursor-grabbing"
        >
          <DragIcon />
        </button>
      </div>

      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button
          onClick={() => setUpdateSubCategoryIsOpen(true)}
          title="Modifier la sous-catégorie"
          className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:scale-110 hover:text-[#394B39]"
        >
          <EditIcon />
        </button>

        <button
          title="Supprimer la sous-catégorie"
          className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm backdrop-blur transition hover:scale-110 hover:text-red-600"
          onClick={() => {
            const confirmed = window.confirm(
              "Supprimer définitivement cette sous-catégorie ?",
            );

            if (!confirmed) return;

            deleteSubCategory(subcategory.id);
          }}
        >
          <DeleteIcon />
        </button>
      </div>

      {subcategory.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            fill
            src={subcategory.image}
            alt={subcategory.label}
            className="object-cover"
          />
        </div>
      )}

      <div className="p-8">
        <h2 className="mb-4 text-center font-serif text-2xl leading-none tracking-tight text-[#394B39]">
          {subcategory.label}
        </h2>

        <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#B7D8A8] to-transparent" />

        {subcategory.description && (
          <p className="mb-6 text-sm font-light leading-relaxed text-[#1A2F1A]/70">
            {subcategory.description}
          </p>
        )}

        <div className="space-y-4">
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
                className={`relative cursor-pointer transition ${
                  isSelected
                    ? "rounded-xl bg-[#FAF8F4] p-4 ring-2 ring-[#B7D8A8]"
                    : ""
                }`}
              >
                <ServiceDetails
                  service={service}
                  categoryDiscount={categoryDiscount}
                  subcategoryDiscount={subcategory.discount}
                />

                {isSelected && (
                  <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                    <button
                      type="button"
                      disabled={serviceIndex === 0 || isPending}
                      onClick={(event) => {
                        event.stopPropagation();
                        moveService(service.id, "up");
                      }}
                      className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#394B39] shadow-sm transition hover:bg-[#B7D8A8]/30 disabled:opacity-30"
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
                      className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-[#394B39] shadow-sm transition hover:bg-[#B7D8A8]/30 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setAddServiceIsOpen(true)}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#394B39] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B7D8A8] hover:text-[#394B39]"
        >
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
