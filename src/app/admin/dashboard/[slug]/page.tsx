import { prisma } from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
import SubcategoryCard from "@/components/subcategories/SubcategoryCard";
import { AddSubCategoryButton } from "@/components/admin/AddSubCategoryButton";

export default async function AdminSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      subcategories: {
        include: {
          services: {
            orderBy: { position: "asc" },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <AddSubCategoryButton category={category} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {category.subcategories.map((subcategory) => (
          <SubcategoryCard
            key={subcategory.id}
            subcategory={subcategory}
            services={subcategory.services}
          />
        ))}
      </div>

      {category.subcategories.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          Aucune prestation n'est disponible dans cette catégorie.
        </p>
      )}
    </main>
  );
}
