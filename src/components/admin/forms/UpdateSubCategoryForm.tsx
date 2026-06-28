"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Subcategory } from "@/../prisma/generated/prisma/client";
import { updateSubCategory } from "@/actions/subcategoryActions";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

type Props = {
  onClose: () => void;
  subcategory: Subcategory;
};

export function UpdateSubCategoryForm({ onClose, subcategory }: Props) {
  const [state, action, pending] = useActionState(updateSubCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Modifications effectuées");
        onClose();
      }

      if (!state.success) {
        toast.error(
          state.error ?? "Impossible de mettre à jour la sous-catégorie.",
        );
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-5">
        <input name="subcategoryId" hidden value={subcategory.id} />
        <input hidden name="categoryId" value={subcategory.id_category} />
        <input hidden name="discountId" value={subcategory.id_discount ?? ""} />

        <div>
          <h2 className="font-serif text-3xl text-[#394B39]">
            Modifier la sous-catégorie
          </h2>
        </div>

        <FormField
          label="Nom de la sous-catégorie"
          name="label"
          placeholder="Nom de la sous-catégorie"
          defaultValue={subcategory.label}
        />

        <FormField
          label="Description"
          name="description"
          placeholder="Description de la sous-catégorie"
          defaultValue={subcategory.description ?? ""}
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
