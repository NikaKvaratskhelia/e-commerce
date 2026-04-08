"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from "react";

type FormMultiFilePickerProps = {
  label: string;
  error?: string;
  selectedFiles?: File[];
  onRemove: (index: number) => void;
  accept?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "multiple">;

export const FormMultiFilePicker = forwardRef(
  (
    {
      label,
      error,
      selectedFiles = [],
      onRemove,
      className = "",
      id,
      accept,
      ...props
    }: FormMultiFilePickerProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="font-medium text-sm sm:text-base">
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          {...props}
        />

        <label
          htmlFor={inputId}
          className={`flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-gray-400 bg-white px-4 py-4 transition hover:border-black hover:bg-gray-50 ${
            error ? "border-red-500" : ""
          } ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-2">
              <Upload size={18} />
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Choose files</span>
              <span className="text-sm text-gray-500">
                {accept
                  ? accept.replace(/image\//g, "").toUpperCase()
                  : "Any files"}{" "}
                — multiple allowed
              </span>
            </div>
          </div>

          <span className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white">
            Browse
          </span>
        </label>

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="rounded-full bg-gray-100 p-2">
                    <ImageIcon size={18} />
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove(index);
                  }}
                  className="ml-4 shrink-0 rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormMultiFilePicker.displayName = "FormMultiFilePicker";
