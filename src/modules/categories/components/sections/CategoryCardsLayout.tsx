"use client";

import { useCategories } from "../../hooks/queries/use-categories";
import { CategoryCard } from "../common/CategoryCard";

export function CategoryCardsLayout() {
  const { data, isLoading } = useCategories();
  if (isLoading || !data?.data || data?.data?.length === 0) return null;

  return (
    <div className="mx-auto flex flex-col items-center md:flex-row w-full max-w-280 gap-6 px-8 md:p-0">
      <CategoryCard category={data.data[0]} variant="col" />

      <div className="flex flex-1 flex-col gap-6 w-full items-center">
        <CategoryCard category={data.data[1]} variant="row" />

        <CategoryCard category={data.data[2]} variant="row" />
      </div>
    </div>
  );
}
