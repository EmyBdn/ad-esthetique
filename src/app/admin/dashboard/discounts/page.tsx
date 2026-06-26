import { prisma } from "../../../../../lib/prisma";
import { DiscountSection } from "@/components/admin/DiscountSection";
import { AddDiscountButton } from "@/components/admin/AddDiscountButton";

function getDiscountStatus(startDate: Date, endDate: Date) {
  const now = new Date();

  if (startDate > now) return "upcoming";
  if (endDate < now) return "ended";

  return "active";
}

const [categories, subcategories, services] = await Promise.all([
  prisma.category.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      position: "asc",
    },
  }),

  prisma.subcategory.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      position: "asc",
    },
  }),

  prisma.service.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      position: "asc",
    },
  }),
]);

export default async function DiscountsPage() {
  const discounts = await prisma.discount.findMany({
    orderBy: {
      startDate: "desc",
    },
  });

  const activeDiscounts = discounts.filter(
    (discount) =>
      getDiscountStatus(discount.startDate, discount.endDate) === "active",
  );

  const upcomingDiscounts = discounts.filter(
    (discount) =>
      getDiscountStatus(discount.startDate, discount.endDate) === "upcoming",
  );

  const endedDiscounts = discounts.filter(
    (discount) =>
      getDiscountStatus(discount.startDate, discount.endDate) === "ended",
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <AddDiscountButton
        categories={categories}
        subcategories={subcategories}
        services={services}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl border p-6">
          <p className="text-sm text-gray-500">En cours</p>
          <p className="text-3xl font-semibold">{activeDiscounts.length}</p>
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-sm text-gray-500">À venir</p>
          <p className="text-3xl font-semibold">{upcomingDiscounts.length}</p>
        </div>

        <div className="rounded-2xl border p-6">
          <p className="text-sm text-gray-500">Terminées</p>
          <p className="text-3xl font-semibold">{endedDiscounts.length}</p>
        </div>
      </div>

      {discounts.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500">
            Aucune promotion n&apos;a encore été créée.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          <DiscountSection
            title="Promotions en cours"
            discounts={activeDiscounts}
            showEndAction
            showDeleteAction
          />

          <DiscountSection
            title="Promotions à venir"
            discounts={upcomingDiscounts}
            showDeleteAction
          />

          <DiscountSection
            title="Promotions terminées"
            discounts={endedDiscounts}
            showDeleteAction
          />
        </div>
      )}
    </main>
  );
}
