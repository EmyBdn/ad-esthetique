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

      <SubcategoryList subcategories={category.subcategories} />

      {category.subcategories.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          Aucune prestation n&apos;est disponible dans cette catégorie.
        </p>
      )}
    </main>
  );
}
