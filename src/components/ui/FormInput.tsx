import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

type FormInputProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef(
  (
    { label, error, className = "", ...props }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id} className="font-medium text-sm sm:text-base">
          {label}
        </label>

        <input
          ref={ref}
          className={`rounded-xl border px-4 py-3 outline-none transition focus:border-black ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
