import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";

type FormTextareaProps = {
  label: string;
  error?: string;
  rows?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = forwardRef(
  (
    { label, error, className = "", ...props }: FormTextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id} className="font-medium text-sm sm:text-base">
          {label}
        </label>

        <textarea
          ref={ref}
          className={`resize-none rounded-xl border px-4 py-3 outline-none transition focus:border-black ${
            error ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
