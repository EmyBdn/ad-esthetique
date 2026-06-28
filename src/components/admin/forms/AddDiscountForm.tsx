"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect, useState } from "react";
import { createDiscount } from "@/actions/discountActions";
import { toast } from "react-toastify";
import { FormField } from "@/components/admin/forms/FormField";
import { FormActions } from "@/components/admin/forms/FormActions";

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
      <form action={action} className="space-y-5">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
            Offres
          </p>

          <h2 className="font-serif text-3xl text-[#394B39]">
            Ajouter une promotion
          </h2>
        </div>

        <FormField
          label="Nom de la promotion"
          name="label"
          placeholder="Ex : Offre printemps"
        />

        <FormField
          label="Appliquer à"
          name="targetType"
          select
          value={targetType}
          onChange={(e) => setTargetType(e.target.value)}
        >
          <option value="category">Catégories</option>
          <option value="subcategory">Sous-catégories</option>
          <option value="service">Services</option>
        </FormField>

        <FormField label="Éléments concernés" name="targetIds" select multiple>
          {targetOptions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </FormField>

        <FormField
          label="Type de remise"
          name="discountType"
          select
          defaultValue="PERCENTAGE"
        >
          <option value="PERCENTAGE">Pourcentage</option>
          <option value="AMOUNT">Montant fixe</option>
        </FormField>

        <FormField
          label="Valeur"
          type="number"
          name="value"
          placeholder="Valeur de la remise"
          step="0.01"
          min="0"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Date de début" type="date" name="startDate" />
          <FormField label="Date de fin" type="date" name="endDate" />
        </div>

        <FormActions
          pending={pending}
          submitLabel="Créer la promotion"
          pendingLabel="Création..."
          onCancel={onClose}
        />
      </form>
    </Modal>
  );
}
