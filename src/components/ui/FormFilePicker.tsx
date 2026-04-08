"use client";

import { FileIcon, Upload, X } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useId } from "react";

type FormFilePickerProps = {
  label: string;
  error?: string;
  selectedFile?: File;
  existingFileUrl?: string;
  onClear?: () => void;
  accept?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const FormFilePicker = forwardRef<HTMLInputElement, FormFilePickerProps>(
  (
    {
      label,
      error,
      selectedFile,
      existingFileUrl,
      onClear,
      className = "",
      id,
      accept,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const existingFileName = existingFileUrl?.split("/").pop();

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="font-medium text-sm sm:text-base">
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          type="file"
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
              <span className="font-medium">
                {selectedFile || existingFileUrl ? "Replace file" : "Choose file"}
              </span>
              <span className="text-sm text-gray-500">
                {accept ?? "Any file"}
              </span>
            </div>
          </div>

          <span className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white">
            Browse
          </span>
        </label>

        {selectedFile && (
          <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3 overflow-hidden">
              <div className="rounded-full bg-gray-100 p-2">
                <FileIcon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>

            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onClear();
                }}
                className="ml-4 shrink-0 rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {!selectedFile && existingFileUrl && (
          <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
            <div className="flex min-w-0 items-center gap-3 overflow-hidden">
              <div className="rounded-full bg-gray-100 p-2">
                <FileIcon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <a
                  href={existingFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-sm font-medium underline"
                >
                  {existingFileName ?? "Current file"}
                </a>
                <span className="text-xs text-gray-500">Existing file</span>
              </div>
            </div>

            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onClear();
                }}
                className="ml-4 shrink-0 rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormFilePicker.displayName = "FormFilePicker";