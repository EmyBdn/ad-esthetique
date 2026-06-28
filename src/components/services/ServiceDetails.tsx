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
      <div className="border-b border-[#1A2F1A]/10 pb-4 last:border-0 last:pb-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-[#394B39]">{service.label}</h3>

            {service.duration && (
              <p className="text-sm text-[#1A2F1A]/55">
                {service.duration} min
              </p>
            )}

            {service.details && (
              <p className="mt-2 text-sm font-light leading-relaxed text-[#1A2F1A]/65">
                {service.details}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-start gap-3 text-right">
            {originalPrice > 0 && (
              <div>
                {hasActiveDiscount ? (
                  <>
                    <p className="text-sm text-[#394B39]/40 line-through">
                      {originalPrice}€
                    </p>

                    <p className="font-semibold text-[#394B39]">
                      {discountedPrice}€
                    </p>
                  </>
                ) : (
                  <p className="font-semibold text-[#394B39]">
                    {originalPrice}€
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center gap-1">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setUpdateServiceIsOpen(true);
                }}
                title="Modifier le service"
                className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm transition hover:bg-[#B7D8A8]/30 hover:text-[#394B39]"
              >
                <EditIcon />
              </button>

              <button
                title="Supprimer le service"
                className="rounded-full bg-white/90 p-2 text-[#394B39]/60 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteService(service.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
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
