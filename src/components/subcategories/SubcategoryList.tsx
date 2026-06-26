"use client";

import { useEffect, useState } from "react";
import {
  Subcategory,
  Service,
  Discount,
} from "@/../prisma/generated/prisma/client";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import SubcategoryCard from "@/components/subcategories/SubcategoryCard";
import { updateSubcategoriesPosition } from "@/actions/subcategoryActions";
import { DragEndEvent } from "@/types";

type ServiceWithDiscount = Service & {
  discount: Discount | null;
};

type SubcategoryWithServices = Subcategory & {
  discount: Discount | null;
  services: ServiceWithDiscount[];
};

type Props = {
  subcategories: SubcategoryWithServices[];
  categoryDiscount: Discount | null;
};

export default function SubcategoryList({
  subcategories,
  categoryDiscount,
}: Props) {
  const [items, setItems] = useState(subcategories);

  useEffect(() => {
    setItems(subcategories);
  }, [subcategories]);

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
    updateSubcategoriesPosition(nextItems.map((item) => item.id));
  };

  return (
    <DragDropProvider onDragEnd={handleOnDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.map((subcategory, index) => (
          <SubcategoryCard
            key={subcategory.id}
            subcategory={subcategory}
            services={subcategory.services}
            index={index}
            categoryDiscount={categoryDiscount}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
