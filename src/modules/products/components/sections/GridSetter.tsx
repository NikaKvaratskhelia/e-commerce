"use client";

import { FilterSidebarDropdowns } from "./FilterSidebarDropdwons";
import { GridValues } from "./ProductsGrid";
import { GRID_OPTIONS } from "../../constants/grid_options";
import { Dropdown } from "../common/Dropdown";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  gridCols: GridValues;
  setGridCols: (gridCol: GridValues) => void;
};

const priceSortOptions: Record<string, string>[] = [
  { "Price: (asc)": "asc" },
  { "Price: (desc)": "desc" },
];

export function GridSetter({ gridCols, setGridCols }: Props) {
  const router = useRouter();
  const params = useSearchParams();

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

  return (
    <div className="flex justify-between w-full items-end flex-wrap gap-4">
      <div className="flex-1">
        <FilterSidebarDropdowns show={gridCols !== "grid-cols-3"} />
      </div>
      <div className="max-w-35 ml-auto">
        <Dropdown
          variant="default"
          placeholder="Sort By"
          options={priceSortOptions}
          onChange={(value) => {
            updateParams({ sortBy: "price", sort: value });
          }}
        />
      </div>

      <div className="justify-end gap-6 ml-auto flex-wrap max-w-fit pl-5 hidden sm:flex">
        {GRID_OPTIONS.map((option) => {
          const isActive = gridCols === option.value;

          return (
            <div
              key={option.value}
              className={`p-2 border border-(--neutral-light-grey) ${
                isActive ? "bg-(--primary)/10" : "bg-white"
              }`}
              onClick={() => setGridCols(option.value)}
            >
              <div
                className={`flex items-center justify-center w-5.25 h-5.25 ${
                  isActive ? "text-(--primary)" : "text-(--neutral-light-grey)"
                } cursor-pointer`}
              >
                {option.svg}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
