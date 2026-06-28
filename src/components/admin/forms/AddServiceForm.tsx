"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createService } from "@/actions/serviceActions";
import { Subcategory } from "@/../prisma/generated/prisma/client";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
  subcategory: Subcategory;
};

export function AddServiceForm({ onClose, subcategory }: Props) {
  const [state, action, pending] = useActionState(createService, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Service ajouté");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de créer le service.");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <input hidden name="subcategoryId" value={subcategory.id} />

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
            {subcategory.label}
          </p>

          <h2 className="font-serif text-3xl text-[#394B39]">
            Ajouter un service
          </h2>
        </div>

        <FormField
          label="Nom du service"
          name="label"
          placeholder="Ex : Soin éclat"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Durée"
            name="duration"
            placeholder="En minutes"
            type="number"
            min="0"
          />

          <FormField
            label="Prix"
            name="price"
            placeholder="Ex : 45"
            type="number"
            min="0"
          />
        </div>

        <FormField
          label="Détails"
          name="details"
          placeholder="Détails de la prestation"
          textarea
        />

        <FormActions
          pending={pending}
          submitLabel="Ajouter"
          pendingLabel="Création..."
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}
