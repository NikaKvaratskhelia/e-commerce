"use client";

import { useCategories } from "@/src/modules/categories/hooks/queries/use-categories";
import { CategoryCard } from "../common/CategoryCard";
import { CategoryFetched } from "@/src/modules/categories/server/routes/get.routes";

export function CategoriesLayout({
  onEdit,
}: {
  onEdit: (category: CategoryFetched) => void;
}) {
  const { data } = useCategories();

  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.data?.map((category) => (
        <CategoryCard key={category.id} category={category} onEdit={onEdit} />
      ))}
    </div>
  );
}
