"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "../../lib/auth";
import { uploadImage } from "@/actions/imageActions";
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
  const imageFile = formData.get("image") as File;
  const description = formData.get("description") as string;
  const id_category = formData.get("categoryId") as string;
  const id_discount = formData.get("discountId") as string;

  try {
    const imageFile = formData.get("image") as File;

    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "subcategories");
    }

    const maxOrder = await prisma.subcategory.aggregate({
      where: {
        id_category,
      },
      _max: {
        position: true,
      },
    });

    const newSubCategory = await prisma.subcategory.create({
      data: {
        label: label,
        image: imageUrl,
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
  const imageFile = formData.get("image") as File;
  const description = formData.get("description") as string;
  const id_category = formData.get("categoryId") as string;
  const id_discount = formData.get("discountId") as string;

  try {
    const currentSubCategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
      select: { image: true },
    });

    let imageUrl = currentSubCategory?.image ?? null;

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "subcategories");
    }

    const newSubCategory = await prisma.subcategory.update({
      where: { id: subcategoryId },
      data: {
        label: label,
        image: imageUrl || null,
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

export async function updateSubcategoriesPosition(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.subcategory.update({
          where: { id },
          data: { position: index + 1 },
        }),
      ),
    );

    revalidatePath("/admin/dashboard/[slug]");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la réorganisation :", error);
    return {
      success: false,
      error: "Impossible de réorganiser les sous-catégories.",
    };
  }
}
