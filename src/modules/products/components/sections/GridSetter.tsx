"use client";

import { GridValues } from "./ProductsGrid";

type Props = {
  gridCols: GridValues;
  setGridCols: (gridCol: GridValues) => void;
};

type GridOption = {
  value: GridValues;
  previewCols: number;
  cells: number;
};

const GRID_OPTIONS: GridOption[] = [
  { value: "grid-cols-3", previewCols: 3, cells: 9 },
  { value: "grid-cols-4", previewCols: 2, cells: 4 },
  { value: "grid-cols-2", previewCols: 2, cells: 2 },
  { value: "grid-cols-1", previewCols: 1, cells: 2 },
];

export function GridSetter({ gridCols, setGridCols }: Props) {
  return (
    <div className="flex gap-6 ml-auto">
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
              className={`grid gap-1 w-8 h-8 cursor-pointer grid-cols-${option.previewCols}`}
            >
              {Array.from({ length: option.cells }, (_, i) => (
                <div
                  key={i}
                  className={`rounded-xs h-full w-full ${
                    isActive ? "bg-(--primary)" : "bg-(--neutral-light-grey)"
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
