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
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {discounts.length === 0 ? (
        <p className="text-sm text-gray-500">Aucune promotion.</p>
      ) : (
        <div className="space-y-3">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="rounded-xl border p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{discount.label}</p>

                <p className="text-sm text-gray-500">
                  {discount.startDate.toLocaleDateString("fr-FR")} →{" "}
                  {discount.endDate.toLocaleDateString("fr-FR")}
                </p>
              </div>

              {(showEndAction || showDeleteAction) && (
                <div className="flex items-center gap-3">
                  {showEndAction && (
                    <button
                      type="button"
                      title="Terminer la promotion"
                      onClick={() => handleEndDiscount(discount.id)}
                      className="text-slate-500 hover:text-slate-800 transition"
                    >
                      <ArchiveIcon />
                    </button>
                  )}

                  {showDeleteAction && (
                    <button
                      type="button"
                      title="Supprimer la promotion"
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="text-red-500 hover:text-red-700 transition"
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
