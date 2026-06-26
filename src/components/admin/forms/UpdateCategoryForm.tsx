"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { updateCategory } from "@/actions/categoryActions";
import { toast } from "react-toastify";
import { Category } from "@/../prisma/generated/prisma/client";

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
      <form action={action}>
        <input name="categoryId" hidden defaultValue={category.id} />
        <input
          name="label"
          placeholder="Nom de la catégorie"
          defaultValue={category.label}
        />
        <input
          name="description"
          placeholder="Description de la catégorie (optionelle)"
          defaultValue={category.description ?? ""}
        />
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
        />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
