"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { updateCategory } from "@/actions/categoryActions";
import { toast } from "react-toastify";
import { Category } from "@/../prisma/generated/prisma/client";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
  category: Category;
};

export function UpdateCategoryForm({ onClose, category }: Props) {
  const [state, action, pending] = useActionState(updateCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Modifications effectuées");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de mettre à jour la catégorie.");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <input name="categoryId" hidden defaultValue={category.id} />

        <div>
          <h2 className="font-serif text-3xl text-[#394B39]">
            Modifier la catégorie
          </h2>
        </div>

        <FormField
          label="Nom de la catégorie"
          name="label"
          placeholder="Nom de la catégorie"
          defaultValue={category.label}
        />

        <FormField
          label="Description"
          name="description"
          placeholder="Description de la catégorie"
          defaultValue={category.description ?? ""}
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
          submitLabel="Enregistrer"
          pendingLabel="Enregistrement..."
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}
