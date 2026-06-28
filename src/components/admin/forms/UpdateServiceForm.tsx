"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Service } from "@/../prisma/generated/prisma/client";
import { updateService } from "@/actions/serviceActions";
import { Decimal } from "@prisma/client-runtime-utils";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
  service: Omit<Service, "price"> & { price: Decimal | null };
};

export function UpdateServiceForm({ onClose, service }: Props) {
  const [state, action, pending] = useActionState(updateService, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Modifications effectuées");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de mettre à jour la prestation");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <input name="serviceId" hidden value={service.id} />
        <input hidden name="subcategoryId" value={service.id_subcategory} />
        <input hidden name="discountId" value={service.id_discount ?? ""} />

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
            Prestation
          </p>

          <h2 className="font-serif text-3xl text-[#394B39]">
            Modifier le service
          </h2>
        </div>

        <FormField
          label="Nom du service"
          name="label"
          placeholder="Nom de la prestation"
          defaultValue={service.label}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Durée"
            name="duration"
            placeholder="En minutes"
            defaultValue={service.duration || ""}
            type="number"
          />

          <FormField
            label="Prix"
            name="price"
            placeholder="Prix de la prestation"
            defaultValue={Number(service.price)}
            type="number"
            step="0.01"
          />
        </div>

        <FormField
          label="Détails"
          name="details"
          placeholder="Détails de la prestation"
          defaultValue={service.details ?? ""}
          textarea
        />

        <FormActions
          pending={pending}
          submitLabel="Enregistrer"
          pendingLabel="Enregistrement..."
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}
