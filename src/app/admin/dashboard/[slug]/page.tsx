import { prisma } from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
import { AddSubCategoryButton } from "@/components/admin/AddSubCategoryButton";
import SubcategoryList from "@/components/subcategories/SubcategoryList";

export default async function AdminSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      discount: true,
      subcategories: {
        include: {
          discount: true,
          services: {
            include: {
              discount: true,
            },
            orderBy: { position: "asc" },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 pr-0 sm:pr-72">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1A2F1A]/60">
          Catégorie
        </p>

        <h1 className="font-serif text-3xl text-[#394B39] sm:text-4xl">
          {category.label}
        </h1>
      </div>

      <AddSubCategoryButton category={category} />

      <SubcategoryList
        subcategories={category.subcategories}
        categoryDiscount={category.discount}
      />

      {category.subcategories.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#394B39]/20 bg-[#FAF8F4] py-20 text-center">
          <p className="text-[#1A2F1A]/60">
            Aucune prestation n&apos;est disponible dans cette catégorie.
          </p>
        </div>
      )}
    </main>
  );
}
