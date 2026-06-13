"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import slugify from "slugify";
import { requireAuth } from "@/../lib/auth";

export async function deleteCategory(categoryId: string) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("/admin/dashboard/[slug]", "page");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return { success: false, error: "Impossible de supprimer la catégorie." };
  }
}

export async function createCategory(previous: any, formData: FormData) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const label = formData.get("label") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;

  try {
    const maxOrder = await prisma.category.aggregate({
      _max: { position: true },
    });

    const newCategory = await prisma.category.create({
      data: {
        label: label,
        image: image,
        description: description,
        position: (maxOrder._max.position ?? 0) + 1,
        slug: slugify(label),
      },
    });
    revalidatePath("/admin/dashboard", "page");
    return { success: true, newCategory };
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    return { success: false, error: "Impossible de créer la catégorie." };
  }
}

export async function updateCategory(previous: any, formData: FormData) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const categoryId = formData.get("categoryId") as string;
  const label = formData.get("label") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  try {
    const newCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        label: label,
        image: image || null,
        description: description || null,
        slug: slugify(label),
      },
    });
    revalidatePath("/admin/dashboard", "page");
    return { success: true, newCategory };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return { success: false, error: "Impossible de modifier la catégorie." };
  }
}

export async function updateCategoriesPosition(ids: string[]) {
  try {
    await prisma.$transaction(
      ids.map((id, index) =>
        prisma.category.update({
          where: { id },
          data: { position: index + 1 },
        }),
      ),
    );

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la réorganisation :", error);
    return {
      success: false,
      error: "Impossible de réorganiser les catégories.",
    };
  }
}
