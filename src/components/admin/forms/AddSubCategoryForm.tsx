"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { createSubCategory } from "@/actions/subcategoryActions";
import { Category } from "@/../prisma/generated/prisma/client";

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
      <form action={action}>
        <input name="label" placeholder="Nom de la sous-catégorie" />
        <input
          name="description"
          placeholder="Description de la sous-catégorie (optionelle)"
        />
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
        />
        <input hidden value={category.id} name="categoryId" />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
