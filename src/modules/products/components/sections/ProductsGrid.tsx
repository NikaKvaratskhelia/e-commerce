"use client";

import { useState } from "react";
import { useProducts } from "../../hooks/queries/use-products";
import { ProductCard } from "../common/ProductCard";
import { useSearchParams } from "next/navigation";
import { GridSetter } from "./GridSetter";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCardSkeleton } from "../skeleton/ProductsCardSkeleton";

export type GridValues =
  | "grid-cols-3"
  | "grid-cols-4"
  | "grid-cols-1"
  | "grid-cols-2";

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
    <div className="max-w-280 mx-auto flex items-start gap-10 py-15">
      {gridCol === "grid-cols-3" && <FilterSidebar />}

      <div className="flex flex-col gap-10 flex-1 min-w-0">
        <GridSetter gridCols={gridCol} setGridCols={setGridCol} />
        <div className={`grid ${gridCol} w-full gap-6 justify-items-end`}>
          {data.isLoading ? (
            Array.from({ length: 9 }, (_, i) => (
              <ProductCardSkeleton
                key={i}
                layout={productIsColumn ? "column" : "row"}
              />
            ))
          ) : data.data?.data?.products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center w-full justify-center py-20 gap-3 text-center">
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
