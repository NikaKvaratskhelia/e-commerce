"use client";

import { Check } from "lucide-react";
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from "react";

type CheckboxProps = {
  label?: ReactNode;
  textHtmlFormat?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      checked,
      defaultChecked,
      disabled,
      label,
      textHtmlFormat,
      onChange,
      onCheckedChange,
      name,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex cursor-pointer items-center gap-3 ${
          disabled ? "cursor-not-allowed opacity-60" : ""
        } ${className ?? ""}`}
      >
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />

        <div
          aria-hidden="true"
          className={`flex h-6 w-6 items-center justify-center rounded-sm border border-(--neutral-light-grey) transition
          ${checked ? "bg-(--primary)" : "bg-(--neutral-white)"}`}
        >
          {checked ? (
            <Check width={18} height={18} className="text-white" />
          ) : null}
        </div>

        <div className="select-none text-(--neutral-light-grey)">
          {label ?? textHtmlFormat}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
