import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-3 flex-1">
        <label
          htmlFor={id}
          className="text-sm leading-3 font-bold text-(--neutral-light-grey)"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`px-4 py-2 rounded-md border ${
            error ? "border-red-500" : "border-[#cbcbcb]"
          }`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
