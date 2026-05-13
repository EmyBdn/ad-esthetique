"use client";

import { Modal } from "@/app/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { updateCategory } from "@/app/actions/categoryActions";
import { toast } from "react-toastify";
import { Category } from "@prisma/client";

type Props = {
  onClose: () => void;
  category: Category;
};

export function UpdateCategoryForm({ onClose, category }: Props) {
  const [state, action, pending] = useActionState(updateCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success === true) {
        toast.success("Modifications effectuées");
        onClose();
      }
      if (state.success === false) {
        toast.error(state.error ?? "Impossible de mettre à jour la catégorie.");
      }
    }
  }, [state]);
  return (
    <Modal onClose={onClose}>
      <form action={action}>
        <input name="categoryId" hidden value={category.id} />
        <input
          name="label"
          placeholder="Nom de la catégorie"
          defaultValue={category.label}
        />
        <input
          name="description"
          placeholder="Description de la catégorie"
          defaultValue={category.description ?? ""}
        />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
