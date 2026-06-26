import { Service, Discount } from "@/../prisma/generated/prisma/client";
import { deleteService } from "@/actions/serviceActions";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { useState } from "react";
import { UpdateServiceForm } from "@/components/admin/forms/UpdateServiceForm";
import { Decimal } from "@prisma/client-runtime-utils";
import { applyDiscount, isDiscountActive } from "@/utils/discounts";

export default function ServiceDetails({
  service,
  subcategoryDiscount,
  categoryDiscount,
}: {
  service: Omit<Service, "price"> & {
    price: Decimal | null;
    discount: Discount | null;
  };
  subcategoryDiscount: Discount | null;
  categoryDiscount: Discount | null;
}) {
  const [updateServiceIsOpen, setUpdateServiceIsOpen] = useState(false);

  const originalPrice = Number(service.price);

  const activeDiscount =
    service.discount ?? subcategoryDiscount ?? categoryDiscount;

  const hasActiveDiscount =
    activeDiscount &&
    isDiscountActive(activeDiscount.startDate, activeDiscount.endDate);

  const discountedPrice = hasActiveDiscount
    ? applyDiscount(
        originalPrice,
        activeDiscount.discountType,
        Number(activeDiscount.value),
      )
    : originalPrice;

  return (
    <>
      <div key={service.id} className="group">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-gray-700">{service.label}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {service.duration && (
            <span className="text-gray-400">{service.duration} min</span>
          )}
          {hasActiveDiscount ? (
            <>
              <span className="text-gray-400 line-through">
                {originalPrice}€
              </span>

              <span className="font-bold text-pink-600">
                {discountedPrice}€
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-600">{originalPrice}€</span>
          )}
          <span>{service.details}</span>
          <button
            onClick={() => setUpdateServiceIsOpen(true)}
            title="Modifier le service"
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:scale-110 transition-all"
          >
            <EditIcon />
          </button>
          <button
            title="Supprimer le service"
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-red-600 hover:scale-110 transition-all"
            onClick={() => deleteService(service.id)}
          >
            <DeleteIcon />
          </button>
        </div>

        <div className="mt-4 border-b border-dotted border-gray-200 last:hidden"></div>
      </div>

      {updateServiceIsOpen && (
        <UpdateServiceForm
          onClose={() => setUpdateServiceIsOpen(false)}
          service={service}
        />
      )}
    </>
  );
}
