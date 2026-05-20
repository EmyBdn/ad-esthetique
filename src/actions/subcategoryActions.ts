"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../../lib/auth";
export async function deleteSubCategory(subcategoryId: string) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  try {
    await prisma.subcategory.delete({
      where: {
        id: subcategoryId,
      },
    });

    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return {
      success: false,
      error: "Impossible de supprimer la sous-catégorie.",
    };
  }
}

export async function createSubCategory(previous: any, formData: FormData) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const label = formData.get("label") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;
  const id_category = formData.get("categoryId") as string;
  const id_discount = formData.get("discountId") as string;

  try {
    const maxOrder = await prisma.subcategory.aggregate({
      _max: { position: true },
    });

    const newSubCategory = await prisma.subcategory.create({
      data: {
        label: label,
        image: image,
        description: description,
        position: (maxOrder._max.position ?? 0) + 1,
        id_category: id_category,
        id_discount: id_discount,
      },
    });

    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true, newSubCategory };
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    return { success: false, error: "Impossible de créer la sous-catégorie." };
  }
}

export async function updateSubCategory(previous: any, formData: FormData) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const subcategoryId = formData.get("subcategoryId") as string;
  const label = formData.get("label") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;
  const id_category = formData.get("categoryId") as string;
  const id_discount = formData.get("discountId") as string;

  try {
    const newSubCategory = await prisma.subcategory.update({
      where: { id: subcategoryId },
      data: {
        label: label,
        image: image || null,
        description: description || null,
        id_category: id_category,
        id_discount: id_discount || null,
      },
    });
    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true, newSubCategory };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return {
      success: false,
      error: "Impossible de modifier la sous-catégorie.",
    };
  }
}
