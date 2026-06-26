"use client";

import { useEffect, useState } from "react";
import CategoryCard from "@/components/categories/CategoryCard";
import { Category } from "@/../prisma/generated/prisma/client";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { updateCategoriesPosition } from "@/actions/categoryActions";
import { DragEndEvent } from "@/types";

type Props = {
  categories: Category[];
};

export function CategoryList({ categories }: Props) {
  const [items, setItems] = useState(categories);

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const handleOnDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (!isSortable(source)) return;

    const { initialIndex, index } = source;

    if (initialIndex === index) return;

    const nextItems = [...items];
    const [movedItem] = nextItems.splice(initialIndex, 1);
    nextItems.splice(index, 0, movedItem);

    setItems(nextItems);
    updateCategoriesPosition(nextItems.map((item) => item.id));
  };

  return (
    <DragDropProvider onDragEnd={handleOnDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {items.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </DragDropProvider>
  );
}
