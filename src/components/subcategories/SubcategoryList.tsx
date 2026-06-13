"use client";

import { useState } from "react";
import { Subcategory, Service } from "@prisma/client";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import SubcategoryCard from "@/components/subcategories/SubcategoryCard";
import { updateSubcategoriesPosition } from "@/actions/subcategoryActions";

type SubcategoryWithServices = Subcategory & {
  services: Service[];
};

function SortableSubcategory({
  subcategory,
  index,
}: {
  subcategory: SubcategoryWithServices;
  index: number;
}) {
  const sortable = useSortable({
    id: subcategory.id,
    index,
  });

  return (
    <div ref={sortable.ref}>
      <SubcategoryCard
        subcategory={subcategory}
        services={subcategory.services}
      />
    </div>
  );
}

export function SubcategoryList({
  subcategories,
}: {
  subcategories: SubcategoryWithServices[];
}) {
  const [items, setItems] = useState(subcategories);

  return (
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

        setItems(nextItems);
        updateSubcategoriesPosition(nextItems.map((item) => item.id));
      }}
    >
      <div className="grid grid-cols-1 gap-8">
        {items.map((subcategory, index) => (
          <SortableSubcategory
            key={subcategory.id}
            subcategory={subcategory}
            index={index}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
