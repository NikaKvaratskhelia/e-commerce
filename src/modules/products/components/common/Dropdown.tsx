import { useState, useRef, useEffect } from "react";

type Props = {
  variant: "default" | "outline";
  placeholder: string;
  options: Record<string, string>[];
  label?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
};

export function Dropdown({
  label,
  variant,
  placeholder,
  options,
  defaultValue,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(value: string) {
    setSelected(value);
    onChange(value);
    setIsOpen(false);
  }

  const displayLabel = selected
    ? Object.keys(
        options.find((o) => Object.values(o)[0] === selected) ?? {},
      )[0]
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-2 items-start w-full"
    >
      {label && (
        <p className="text-xs font-semibold uppercase tracking-widest leading-6 text-(--neutral-light-grey)">
          {label}
        </p>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={[
          "flex items-center justify-between gap-2 w-full min-h-10.5 rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 hover:bg-black/3",
          variant === "outline"
            ? "border border-(--neutral-light-grey) bg-white"
            : "border-none bg-transparent",
        ].join(" ")}
      >
        <span
          className={
            selected
              ? "font-medium text-gray-900"
              : "text-(--neutral-light-grey)"
          }
        >
          {displayLabel ?? placeholder}
        </span>

        <svg
          className={`shrink-0 text-(--neutral-light-grey) transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-black/10 rounded-xl overflow-hidden shadow-lg"
        >
          {options.map((opt, i) => {
            const [optLabel, optValue] = Object.entries(opt)[0];
            const isSelected = selected === optValue;
            return (
              <li
                key={i}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(optValue)}
                className={[
                  "flex items-center justify-between gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100",
                  "not-last:border-b not-last:border-black/5",
                  isSelected
                    ? "bg-indigo-50 font-medium text-indigo-600"
                    : "text-gray-900 hover:bg-gray-50",
                ].join(" ")}
              >
                <span>{optLabel}</span>
                {isSelected && (
                  <svg
                    className="shrink-0 text-indigo-600"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 7.5L6.5 11L12 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
