"use client";

import { Modal } from "@/components/admin/Modal";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { Service } from "@prisma/client";
import { updateService } from "@/actions/serviceActions";

type Props = {
  onClose: () => void;
  service: Omit<Service, "price"> & { price: number };
};

export function UpdateServiceForm({ onClose, service }: Props) {
  const [state, action, pending] = useActionState(updateService, null);

  useEffect(() => {
    if (state !== null) {
      if (state.success === true) {
        toast.success("Modifications effectuées");
        onClose();
      }
      if (state.success === false) {
        toast.error(state.error ?? "Impossible de mettre à jour le services");
      }
    }
  }, [state]);
  return (
    <Modal onClose={onClose}>
      <form action={action}>
        <input name="serviceId" hidden value={service.id} />
        <input
          name="label"
          placeholder="Nom de la prestation"
          defaultValue={service.label}
        />
        <input
          name="duration"
          placeholder="Durée de la prestation"
          defaultValue={service.duration}
          type="number"
        />
        <input
          name="price"
          placeholder="Prix de la prestation"
          defaultValue={service.price}
          type="number"
        />
        <input
          name="details"
          placeholder="Détails de la prestation"
          defaultValue={service.details ?? ""}
        />
        <input hidden name="subcategoryId" value={service.id_subcategory} />
        <input hidden name="discountId" value={service.id_discount ?? ""} />
        <input type={"submit"} name="submit" />
      </form>
    </Modal>
  );
}
