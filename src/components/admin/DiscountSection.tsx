"use client";

import { toast } from "react-toastify";
import { deleteDiscount, endDiscount } from "@/actions/discountActions";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import { ArchiveIcon } from "@/components/admin/icons/ArchiveIcon";

type Discount = {
  id: string;
  label: string;
  startDate: Date;
  endDate: Date;
};

type Props = {
  title: string;
  discounts: Discount[];
  showEndAction?: boolean;
  showDeleteAction?: boolean;
};

export function DiscountSection({
  title,
  discounts,
  showEndAction = false,
  showDeleteAction = false,
}: Props) {
  async function handleEndDiscount(discountId: string) {
    const result = await endDiscount(discountId);

    if (result.success) {
      toast.success("Promotion terminée");
    } else {
      toast.error(result.error ?? "Impossible de terminer la promotion.");
    }
  }

  async function handleDeleteDiscount(discountId: string) {
    const confirmed = window.confirm(
      "Supprimer définitivement cette promotion ?",
    );

    if (!confirmed) return;

    const result = await deleteDiscount(discountId);

    if (result.success) {
      toast.success("Promotion supprimée");
    } else {
      toast.error(result.error ?? "Impossible de supprimer la promotion.");
    }
  }

  return (
    <section>
      <h2 className="mb-5 font-serif text-2xl text-[#394B39]">{title}</h2>

      {discounts.length === 0 ? (
        <p className="rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-5 text-sm text-[#1A2F1A]/60">
          Aucune promotion.
        </p>
      ) : (
        <div className="space-y-3">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#394B39]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-medium text-[#394B39]">{discount.label}</p>

                <p className="mt-1 text-sm text-[#1A2F1A]/55">
                  {discount.startDate.toLocaleDateString("fr-FR")} →{" "}
                  {discount.endDate.toLocaleDateString("fr-FR")}
                </p>
              </div>

              {(showEndAction || showDeleteAction) && (
                <div className="flex shrink-0 items-center gap-2">
                  {showEndAction && (
                    <button
                      type="button"
                      title="Terminer la promotion"
                      onClick={() => handleEndDiscount(discount.id)}
                      className="rounded-full bg-[#FAF8F4] p-2 text-[#394B39]/60 transition hover:bg-[#B7D8A8]/30 hover:text-[#394B39]"
                    >
                      <ArchiveIcon />
                    </button>
                  )}

                  {showDeleteAction && (
                    <button
                      type="button"
                      title="Supprimer la promotion"
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="rounded-full bg-red-50 p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
