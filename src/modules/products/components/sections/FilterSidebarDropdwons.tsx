"use client";

import { useCategories } from "@/src/modules/categories/hooks/queries/use-categories";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Dropdown } from "../common/Dropdown";

const PRICE_RANGES = [
  { label: "All Price", min: "", max: "" },
  { label: "$0.00 - 99.99", min: "0", max: "99.99" },
  { label: "$100.00 - 199.99", min: "100", max: "199.99" },
  { label: "$200.00 - 299.99", min: "200", max: "299.99" },
  { label: "$300.00 - 399.99", min: "300", max: "399.99" },
  { label: "$400.00+", min: "400", max: "" },
];

const encodePriceRange = (min: string, max: string) => `${min}|${max}`;
const decodePriceRange = (value: string) => {
  const [min, max] = value.split("|");
  return { min, max };
};

const priceOptions = PRICE_RANGES.map((r) => ({
  [r.label]: encodePriceRange(r.min, r.max),
}));

export function FilterSidebarDropdowns({ show }: { show: boolean }) {
  const router = useRouter();
  const params = useSearchParams();

  const activeCategory = params.get("categoryId") ?? "";
  const activeMin = params.get("minPrice") ?? "";
  const activeMax = params.get("maxPrice") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const current = new URLSearchParams(params.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val === "") current.delete(key);
        else current.set(key, val);
      });
      router.push(`?${current.toString()}`);
    },
    [params, router],
  );

  const { data } = useCategories();

  const categoryOptions = [
    { "All Categories": "" },
    ...(data?.data?.map((cat) => ({ [cat.title]: cat.id.toString() })) ?? []),
  ];

  const activePriceValue = encodePriceRange(activeMin, activeMax);

  return (
    <aside
      className={`w-52 shrink-0 ${show ? "flex" : " flex w1120:hidden"} flex-col gap-8 sm:flex-row w-full`}
    >
      <div className="max-w-65.5 w-full">
        <Dropdown
          variant="outline"
          label="Categories"
          placeholder="All Categories"
          options={categoryOptions}
          defaultValue={activeCategory}
          onChange={(value) => updateParams({ categoryId: value })}
        />
      </div>

      <div className="max-w-65.5 w-full">
        <Dropdown
          variant="outline"
          label="Price"
          placeholder="All Price"
          options={priceOptions}
          defaultValue={activePriceValue}
          onChange={(value) => {
            const { min, max } = decodePriceRange(value);
            updateParams({ minPrice: min, maxPrice: max });
          }}
        />
      </div>
    </aside>
  );
}
