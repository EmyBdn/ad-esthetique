import { Service } from "@prisma/client";
import { deleteService } from "@/actions/serviceActions";
import { DeleteIcon } from "@/components/admin/icons/DeleteIcon";
import { EditIcon } from "@/components/admin/icons/EditIcon";
import { useState } from "react";
import { UpdateServiceForm } from "@/components/admin/forms/UpdateServiceForm";
export default function ServiceDetails({
  service,
}: {
  service: Omit<Service, "price"> & { price: number };
}) {
  const [updateServiceIsOpen, setUpdateServiceIsOpen] = useState(false);

  return (
    <>
      <div key={service.id} className="group">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-gray-700">{service.label}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">{service.duration}mn</span>
          <span className="font-bold text-gray-600">
            {Number(service.price)}€
          </span>
          <button
            onClick={() => setUpdateServiceIsOpen(true)}
            title="Modifier le service"
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-blue-600 hover:scale-110 transition-all"
          >
            <EditIcon />
          </button>
          <button
            title="Supprimer le service"
            className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-slate-600 hover:text-red-600 hover:scale-110 transition-all"
            onClick={() => deleteService(service.id)}
          >
            <DeleteIcon />
          </button>
        </div>

        {/* Ligne de séparation pointillée entre les services */}
        <div className="mt-4 border-b border-dotted border-gray-200 last:hidden"></div>
      </div>

      {updateServiceIsOpen && (
        <UpdateServiceForm
          onClose={() => setUpdateServiceIsOpen(false)}
          service={service}
        />
      )}
    </>
  );
}
