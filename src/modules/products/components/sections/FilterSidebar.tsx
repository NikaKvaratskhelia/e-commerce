"use client";

import { Checkbox } from "@/src/components/ui/Checkbox";
import { useCategories } from "@/src/modules/categories/hooks/queries/use-categories";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PRICE_RANGES = [
  { label: "All Price", min: "", max: "" },
  { label: "$0.00 - 99.99", min: "0", max: "99.99" },
  { label: "$100.00 - 199.99", min: "100", max: "199.99" },
  { label: "$200.00 - 299.99", min: "200", max: "299.99" },
  { label: "$300.00 - 399.99", min: "300", max: "399.99" },
  { label: "$400.00+", min: "400", max: "" },
];

export function FilterSidebar() {
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

  return (
    <aside className="w-52 shrink-0 hidden flex-col gap-8 w1120:flex">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--neutral-light-grey)">
          Categories
        </p>
        <ul className="flex flex-col gap-2">
          <li>
            <button
              onClick={() => updateParams({ categoryId: "" })}
              className={`text-sm leading-5.5 w-full text-left cursor-pointer transition-colors ${
                activeCategory === ""
                  ? "font-bold text-(--primary)"
                  : "text-(--neutral-dark) hover:text-(--primary)"
              }`}
            >
              All Categories
            </button>
          </li>

          {data?.data?.map((cat) => {
            const isActive = activeCategory === cat.id.toString();
            return (
              <li key={cat.id}>
                <button
                  onClick={() =>
                    updateParams({ categoryId: cat.id.toString() })
                  }
                  className={`text-sm leading-5.5 w-full text-left cursor-pointer transition-colors ${
                    isActive
                      ? "font-bold text-(--primary)"
                      : "text-(--neutral-dark) hover:text-(--primary)"
                  }`}
                >
                  {cat.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-(--neutral-light-grey)">
          Price
        </p>
        <ul className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            {PRICE_RANGES.map((range) => {
              const isActive =
                activeMin === range.min && activeMax === range.max;
              return (
                <li key={range.label}>
                  <Checkbox
                    id={range.label}
                    checked={isActive}
                    onChange={() =>
                      updateParams({ minPrice: range.min, maxPrice: range.max })
                    }
                    textHtmlFormat={
                      <span
                        className={`text-sm leading-5.5 ${
                          isActive
                            ? "font-semibold text-(--primary)"
                            : "text-(--neutral-dark)"
                        }`}
                      >
                        {range.label}
                      </span>
                    }
                  />
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </aside>
  );
}
