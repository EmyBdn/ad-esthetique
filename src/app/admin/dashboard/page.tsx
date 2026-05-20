import { prisma } from "../../../../lib/prisma";
import { AddCategoryButton } from "@/components/admin/AddCategoryButton";
import { CategoryList } from "@/components/categories/CategoryList";

export default async function AdminDashboardPage() {
  const categories = await prisma.category.findMany({
    orderBy: { position: "asc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 relative">
      <AddCategoryButton />

      <CategoryList categories={categories} />

      {categories.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500">Votre catalogue est vide.</p>
        </div>
      )}
    </main>
  );
}
