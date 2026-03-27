"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "../../hooks/queries/use-products";
import { ProductCard } from "../common/ProductCard";
import { GridSetter } from "./GridSetter";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCardSkeleton } from "../skeleton/ProductsCardSkeleton";

export type GridValues =
  | "grid-cols-1"
  | "grid-cols-2"
  | "grid-cols-3"
  | "grid-cols-4";

const GRID_CLASS_MAP: Record<GridValues, string> = {
  "grid-cols-1": "w1120:grid-cols-1",
  "grid-cols-2": "w1120:grid-cols-2",
  "grid-cols-3": "w1120:grid-cols-3",
  "grid-cols-4": "w1120:grid-cols-4",
};

export function ProductsGrid() {
  const [gridCol, setGridCol] = useState<GridValues>("grid-cols-3");
  const params = useSearchParams();

  const data = useProducts({
    limit: params.get("limit") ?? "",
    newOnly: "false",
    sortBy: params.get("sortBy") ?? "",
    sort: "",
    categoryId: params.get("categoryId") ?? "",
    minPrice: params.get("minPrice") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
  });

  const productIsColumn =
    gridCol === "grid-cols-3" || gridCol === "grid-cols-4";

  return (
    <div className="max-w-280 mx-auto flex items-start gap-10 py-15 px-8 w1120:px-0">
      {gridCol === "grid-cols-3" && <FilterSidebar />}

      <div className="flex flex-col gap-10 flex-1 min-w-0">
        <GridSetter gridCols={gridCol} setGridCols={setGridCol} />

        <div
          className={`grid grid-cols-1 w-full gap-12 ${
            productIsColumn
              ? `grid-cols-[repeat(auto-fit,minmax(216px,1fr))] w1120:${gridCol}`
              : GRID_CLASS_MAP[gridCol]
          }`}
        >
          {data.isLoading ? (
            Array.from({ length: 9 }, (_, i) => (
              <ProductCardSkeleton
                key={i}
                layout={productIsColumn ? "column" : "row"}
              />
            ))
          ) : data.data?.data?.products.length === 0 ? (
            <div className="col-span-full flex w-full flex-col items-center justify-center gap-3 py-20 text-center">
              <p className="text-xl font-semibold text-(--primary)">
                No products found
              </p>
              <p className="text-sm text-(--neutral-light-grey)">
                Try adjusting your filters or browse other categories.
              </p>
            </div>
          ) : (
            data.data?.data?.products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout={productIsColumn ? "column" : "row"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
