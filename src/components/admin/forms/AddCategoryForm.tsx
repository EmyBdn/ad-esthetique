"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { createCategory } from "@/actions/categoryActions";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

export function AddCategoryForm({ onClose }: Props) {
  const [state, action, pending] = useActionState(createCategory, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success === true) {
        toast.success("Catégorie ajoutée");
        onClose();
      }

      if (state.success === false) {
        toast.error(state.error ?? "Impossible de créer la catégorie.");
      }
    }
  }, [state]);
  return (
    <Modal onClose={onClose}>
      <form action={action}>
        <input name="label" placeholder="Nom de la catégorie" />
        <input name="description" placeholder="Description de la catégorie" />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
