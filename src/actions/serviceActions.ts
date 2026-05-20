"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";

export async function deleteService(serviceId: string) {
  try {
    await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });

    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return { success: false, error: "Impossible de supprimer la prestation." };
  }
}

export async function createService(previous: any, formData: FormData) {
  const label = formData.get("label") as string;
  const duration = parseInt(formData.get("duration") as string);
  const price = parseInt(formData.get("price") as string);
  const details = formData.get("description") as string;
  const id_subcategory = formData.get("subcategoryId") as string;

  try {
    const maxOrder = await prisma.service.aggregate({
      _max: { position: true },
    });

    const newService = await prisma.service.create({
      data: {
        label: label,
        duration: duration,
        price: price,
        details: details,
        position: (maxOrder._max.position ?? 0) + 1,
        id_subcategory: id_subcategory,
      },
    });
    revalidatePath("/admin/dashboard/[slug]", "page");
    return { success: true, newService };
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    return { success: false, error: "Impossible de créer la prestation." };
  }
}
export async function updateService(previous: any, formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const label = formData.get("label") as string;
  const duration = parseInt(formData.get("duration") as string);
  const price = parseFloat(formData.get("price") as string);
  const details = formData.get("details") as string;
  const id_subcategory = formData.get("subcategoryId") as string;
  const id_discount = formData.get("discountId") as string;

  try {
    const newService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        label: label,
        duration: duration,
        price: price,
        details: details || null,
        id_subcategory: id_subcategory,
        id_discount: id_discount || null,
      },
    });
    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true, newService };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return { success: false, error: "Impossible de modifier la prestation." };
  }
}
