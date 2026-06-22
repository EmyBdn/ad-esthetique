"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Subcategory } from "@prisma/client";
import { updateSubCategory } from "@/actions/subcategoryActions";

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
      <form action={action}>
        <input name="subcategoryId" hidden value={subcategory.id} />
        <input
          name="label"
          placeholder="Nom de la sous-catégorie"
          defaultValue={subcategory.label}
        />
        <input
          name="description"
          placeholder="Description de la sous-catégorie (optionelle)"
          defaultValue={subcategory.description ?? ""}
        />
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
        />
        <input hidden name="categoryId" value={subcategory.id_category} />
        <input hidden name="discountId" value={subcategory.id_discount ?? ""} />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
