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
    <main className="relative mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 pr-0 sm:pr-64">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
          Offres
        </p>

        <h1 className="font-serif text-3xl text-[#394B39] sm:text-4xl">
          Promotions
        </h1>
      </div>

      <AddDiscountButton
        categories={categories}
        subcategories={subcategories}
        services={services}
      />

      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[#394B39]/10 bg-[#FAF8F4] p-6 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#1A2F1A]/50">
            En cours
          </p>
          <p className="font-serif text-4xl text-[#394B39]">
            {activeDiscounts.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#394B39]/10 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#1A2F1A]/50">
            À venir
          </p>
          <p className="font-serif text-4xl text-[#394B39]">
            {upcomingDiscounts.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#394B39]/10 bg-white p-6 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#1A2F1A]/50">
            Terminées
          </p>
          <p className="font-serif text-4xl text-[#394B39]">
            {endedDiscounts.length}
          </p>
        </div>
      </div>

      {discounts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#394B39]/20 bg-[#FAF8F4] py-20 text-center">
          <p className="text-[#1A2F1A]/60">
            Aucune promotion n&apos;a encore été créée.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
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
