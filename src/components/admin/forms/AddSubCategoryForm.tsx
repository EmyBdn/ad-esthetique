"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createSubCategory } from "@/actions/subcategoryActions";
import { Category } from "@/../prisma/generated/prisma/client";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
  category: Category;
};

export function AddSubCategoryForm({ onClose, category }: Props) {
  const [state, action, pending] = useActionState(createSubCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Sous-catégorie ajoutée");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de créer la sous-catégorie.");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <input hidden value={category.id} name="categoryId" />

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
            {category.label}
          </p>

          <h2 className="font-serif text-3xl text-[#394B39]">
            Ajouter une sous-catégorie
          </h2>
        </div>

        <FormField
          label="Nom de la sous-catégorie"
          name="label"
          placeholder="Ex : Épilations visage"
        />

        <FormField
          label="Description"
          name="description"
          placeholder="Description de la sous-catégorie"
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
