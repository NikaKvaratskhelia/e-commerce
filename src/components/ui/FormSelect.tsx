import { ForwardedRef, forwardRef, SelectHTMLAttributes } from "react";

type FormSelectProps = {
  label: string;
  error?: string;
  options: { value: string | number; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const FormSelect = forwardRef(
  (
    { label, error, options, className = "", ...props }: FormSelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id} className="font-medium text-sm sm:text-base">
          {label}
        </label>

        <select
          ref={ref}
          className={`rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-black appearance-none cursor-pointer ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";
