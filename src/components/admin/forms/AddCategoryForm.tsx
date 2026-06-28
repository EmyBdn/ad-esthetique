"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { createCategory } from "@/actions/categoryActions";
import { toast } from "react-toastify";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
};

export function AddCategoryForm({ onClose }: Props) {
  const [state, action, pending] = useActionState(createCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Catégorie ajoutée");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de créer la catégorie.");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <div>
          <h2 className="font-serif text-3xl text-[#394B39]">
            Ajouter une catégorie
          </h2>
        </div>

        <FormField
          label="Nom de la catégorie"
          name="label"
          placeholder="Ex : Soins du visage"
        />

        <FormField
          label="Description"
          name="description"
          placeholder="Description de la catégorie"
          textarea
        />

        <FormField
          label="Image"
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
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
