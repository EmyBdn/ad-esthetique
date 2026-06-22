"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createService } from "@/actions/serviceActions";
import { Subcategory } from "@prisma/client";

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
        toast.error(state.error ?? "Impossible de créer le services.");
      }
    }
  }, [state, onClose]);
  return (
    <Modal onClose={onClose}>
      <form action={action}>
        <input name="label" placeholder="Nom du service" />
        <input
          name="duration"
          placeholder="Durée de la prestation (en minutes)"
          type="number"
          min="0"
        />
        <input
          name="price"
          placeholder="Prix de la prestation"
          type="number"
          min="0"
        />

        <input name="details" placeholder="Détails de la prestation" />
        <input hidden name="subcategoryId" value={subcategory.id} />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
