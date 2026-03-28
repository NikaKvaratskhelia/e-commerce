"use client";

import { FilterSidebarDropdowns } from "./FilterSidebarDropdwons";
import { GridValues } from "./ProductsGrid";
import { GRID_OPTIONS } from "../../constants/grid_options";

type Props = {
  gridCols: GridValues;
  setGridCols: (gridCol: GridValues) => void;
};

export function GridSetter({ gridCols, setGridCols }: Props) {
  return (
    <div className="flex justify-between w-full items-end">
      <div className="flex-1">
        <FilterSidebarDropdowns show={gridCols !== "grid-cols-3"} />
      </div>
      <div className="flex justify-end gap-6 ml-auto flex-wrap flex-1">
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
