"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  icon?: ReactNode;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, icon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="border-b border-(--neutral-dark-white) pb-2 cursor-pointer flex justify-between items-center w-full"
        >
          <input
            ref={ref}
            id={id}
            name={props.name ?? id}
            className={
              "outline-none text-[16px] leading-6.5 w-full bg-transparent text-(--neutral-light-grey)"
            }
            {...props}
          />

          {icon && (
            <div className="text-(--neutral-light-grey) w-5 h-3.5 flex items-center justify-center">
              {icon}
            </div>
          )}
        </label>

        {error && <p className="mt-2 text-[12px] text-red-600 font-semibold select-none">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
