import { prisma } from "../../../lib/prisma";

import DndCategories from "./DnDCategories";

export default async function Page() {
  const categories = await prisma.category.findMany({
    orderBy: {
      position: "asc",
    },

    select: {
      id: true,
      label: true,
      position: true,
    },
  });

  return <DndCategories categories={categories} />;
}
