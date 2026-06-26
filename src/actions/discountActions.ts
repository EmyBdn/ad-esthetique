"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requireAuth } from "@/../lib/auth";
import { DiscountType } from "@/../prisma/generated/prisma/client";

export async function createDiscount(previous: any, formData: FormData) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  const label = formData.get("label") as string;
  const discountType = formData.get("discountType") as DiscountType;
  const value = Number(formData.get("value"));
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const targetType = formData.get("targetType") as string;
  const targetIds = formData.getAll("targetIds") as string[];

  try {
    if (!label || !discountType || !value || !startDate || !endDate) {
      return {
        success: false,
        error: "Tous les champs sont obligatoires.",
      };
    }

    if (new Date(startDate) > new Date(endDate)) {
      return {
        success: false,
        error: "La date de début doit être antérieure à la date de fin.",
      };
    }

    const now = new Date();
    const newStartDate = new Date(startDate);
    const endPreviousDiscountAt = newStartDate > now ? newStartDate : now;

    const newDiscount = await prisma.$transaction(async (tx) => {
      const newDiscount = await tx.discount.create({
        data: {
          label,
          discountType,
          value,
          startDate: newStartDate,
          endDate: new Date(endDate),
        },
      });

      if (targetType === "category") {
        const categories = await tx.category.findMany({
          where: { id: { in: targetIds } },
          select: { id_discount: true },
        });

        const oldDiscountIds = categories
          .map((category) => category.id_discount)
          .filter((id): id is string => Boolean(id));

        await tx.discount.updateMany({
          where: {
            id: { in: oldDiscountIds },
            endDate: { gt: endPreviousDiscountAt },
          },
          data: {
            endDate: endPreviousDiscountAt,
          },
        });

        await tx.category.updateMany({
          where: { id: { in: targetIds } },
          data: { id_discount: newDiscount.id },
        });
      }

      if (targetType === "subcategory") {
        const subcategories = await tx.subcategory.findMany({
          where: { id: { in: targetIds } },
          select: { id_discount: true },
        });

        const oldDiscountIds = subcategories
          .map((subcategory) => subcategory.id_discount)
          .filter((id): id is string => Boolean(id));

        await tx.discount.updateMany({
          where: {
            id: { in: oldDiscountIds },
            endDate: { gt: endPreviousDiscountAt },
          },
          data: {
            endDate: endPreviousDiscountAt,
          },
        });

        await tx.subcategory.updateMany({
          where: { id: { in: targetIds } },
          data: { id_discount: newDiscount.id },
        });
      }

      if (targetType === "service") {
        const services = await tx.service.findMany({
          where: { id: { in: targetIds } },
          select: { id_discount: true },
        });

        const oldDiscountIds = services
          .map((service) => service.id_discount)
          .filter((id): id is string => Boolean(id));

        await tx.discount.updateMany({
          where: {
            id: { in: oldDiscountIds },
            endDate: { gt: endPreviousDiscountAt },
          },
          data: {
            endDate: endPreviousDiscountAt,
          },
        });

        await tx.service.updateMany({
          where: { id: { in: targetIds } },
          data: { id_discount: newDiscount.id },
        });
      }

      return newDiscount;
    });

    revalidatePath("/admin/dashboard/discounts", "page");

    return {
      success: true,
      newDiscount,
    };
  } catch (error) {
    console.error("Erreur lors de la création :", error);

    return {
      success: false,
      error: "Impossible de créer la promotion.",
    };
  }
}
export async function endDiscount(discountId: string) {
  const session = await requireAuth();

  if (!session) {
    return {
      success: false,
      error: "UNAUTHORIZED",
    };
  }

  try {
    await prisma.discount.update({
      where: {
        id: discountId,
      },
      data: {
        endDate: new Date(),
      },
    });

    revalidatePath("/admin/dashboard/discounts", "page");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Erreur lors de la clôture :", error);

    return {
      success: false,
      error: "Impossible de mettre fin à la promotion.",
    };
  }
}

export async function deleteDiscount(discountId: string) {
  const session = await requireAuth();

  if (!session) {
    return { success: false, error: "UNAUTHORIZED" };
  }

  try {
    await prisma.discount.delete({
      where: { id: discountId },
    });

    revalidatePath("/admin/dashboard/discounts", "page");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return { success: false, error: "Impossible de supprimer la promotion." };
  }
}
