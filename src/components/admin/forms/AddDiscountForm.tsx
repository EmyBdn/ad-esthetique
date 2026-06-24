"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect, useState } from "react";
import { createDiscount } from "@/actions/discountActions";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  categories: {
    id: string;
    label: string;
  }[];
  subcategories: {
    id: string;
    label: string;
  }[];
  services: {
    id: string;
    label: string;
  }[];
};

export function AddDiscountForm({
  onClose,
  categories,
  subcategories,
  services,
}: Props) {
  const [state, action, pending] = useActionState(createDiscount, null);

  const [targetType, setTargetType] = useState("category");

  const targetOptions =
    targetType === "category"
      ? categories
      : targetType === "subcategory"
        ? subcategories
        : services;

  useEffect(() => {
    if (state !== null) {
      if (state.success) {
        toast.success("Promotion ajoutée");
        onClose();
      }

      if (!state.success) {
        toast.error(state.error ?? "Impossible de créer la promotion.");
      }
    }
  }, [state, onClose]);

  return (
    <Modal onClose={onClose}>
      <form action={action} className="space-y-4">
        <input name="label" placeholder="Nom de la promotion" />

        <select
          name="targetType"
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
        >
          <option value="category">Catégories</option>
          <option value="subcategory">Sous-catégories</option>
          <option value="service">Services</option>
        </select>

        <select name="targetIds" multiple>
          {targetOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <select name="discountType" defaultValue="PERCENTAGE">
          <option value="PERCENTAGE">Pourcentage</option>
          <option value="AMOUNT">Montant fixe</option>
        </select>

        <input
          type="number"
          name="value"
          placeholder="Valeur de la remise"
          step="0.01"
          min="0"
        />

        <input type="date" name="startDate" />

        <input type="date" name="endDate" />

        <input
          type="submit"
          name="submit"
          value={pending ? "Création..." : "Créer la promotion"}
          disabled={pending}
        />
      </form>
    </Modal>
  );
}
