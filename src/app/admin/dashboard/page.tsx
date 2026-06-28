import { prisma } from "../../../../lib/prisma";
import { AddCategoryButton } from "@/components/admin/AddCategoryButton";
import { CategoryList } from "@/components/categories/CategoryList";

export default async function AdminDashboardPage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 pr-0 sm:pr-64">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
          Catalogue
        </p>

        <h1 className="font-serif text-3xl text-[#394B39] sm:text-4xl">
          Prestations
        </h1>
      </div>

      <AddCategoryButton />

      <CategoryList categories={categories} />

      {categories.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#394B39]/20 bg-[#FAF8F4] py-20 text-center">
          <p className="text-[#1A2F1A]/60">Votre catalogue est vide.</p>
        </div>
      )}
    </main>
  );
}
