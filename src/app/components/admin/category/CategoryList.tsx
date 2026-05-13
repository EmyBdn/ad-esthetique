"use client";

import CategoryCard from "@/app/components/admin/category/CategoryCard";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};

export function CategoryList({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
