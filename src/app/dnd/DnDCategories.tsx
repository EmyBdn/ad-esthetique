"use client";

import { useState } from "react";

import { DragDropProvider } from "@dnd-kit/react";

import { useSortable, isSortable } from "@dnd-kit/react/sortable";

import { updateCategoriesPosition } from "@/actions/categoryActions";

type Category = {
  id: string;

  label: string;

  position: number;
};

function CategoryCard({
  category,

  index,
}: {
  category: Category;

  index: number;
}) {
  const sortable = useSortable({
    id: category.id,

    index,
  });

  return (
    <div
      ref={sortable?.ref}
      className="cursor-grab rounded bg-gray-200 p-4 active:cursor-grabbing"
    >
      {category.label}
    </div>
  );
}

export default function DndCategories({
  categories,
}: {
  categories: Category[];
}) {
  const [items, setItems] = useState(categories);

  return (
    <main className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Test catégories DnD</h1>

      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source } = event.operation;

          if (!isSortable(source)) return;

          const { initialIndex, index } = source;

          if (initialIndex === index) return;

          const nextItems = [...items];
          const [movedItem] = nextItems.splice(initialIndex, 1);
          nextItems.splice(index, 0, movedItem);

          const reorderedItems = nextItems.map((item, index) => ({
            ...item,
            position: index + 1,
          }));

          setItems(reorderedItems);

          updateCategoriesPosition(reorderedItems.map((item) => item.id));
        }}
      >
        <div className="flex max-w-md flex-col gap-3">
          {items.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </DragDropProvider>

      <pre className="mt-6 rounded bg-black p-4 text-sm text-white">
        {JSON.stringify(items, null, 2)}
      </pre>
    </main>
  );
}
