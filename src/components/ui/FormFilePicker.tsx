import { ImageIcon, Upload, X } from "lucide-react";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

type FormFilePickerProps = {
  label: string;
  error?: string;
  selectedFile?: File;
  existingFileUrl?: string;
  onClear: () => void;
  accept?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormFilePicker = forwardRef(
  (
    {
      label,
      error,
      selectedFile,
      existingFileUrl,
      onClear,
      className = "",
      ...props
    }: FormFilePickerProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm sm:text-base">{label}</label>

        <input
          ref={ref}
          type="file"
          className="hidden"
          id={props.id || "file-picker"}
          {...props}
        />

        <label
          htmlFor={props.id || "file-picker"}
          className={`flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-gray-400 bg-white px-4 py-4 transition hover:border-black hover:bg-gray-50 ${
            error ? "border-red-500" : ""
          } ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gray-100 p-2">
              <Upload size={18} />
            </div>

            <div className="flex flex-col">
              <span className="font-medium">Choose file</span>
              <span className="text-sm text-gray-500">
                {props.accept?.replace(/image\//g, "").toUpperCase() || "Any file"} — one file only
              </span>
            </div>
          </div>

          <span className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white">
            Browse
          </span>
        </label>

        {existingFileUrl && !selectedFile && (
          <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
            <div className="rounded-full bg-gray-100 p-2">
              <ImageIcon size={18} />
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="text-sm text-gray-500 line-clamp-1">Current file</span>
              <span className="truncate text-sm font-medium">
                {existingFileUrl.split("/").pop() || "Existing file"}
              </span>
            </div>
          </div>
        )}

        {selectedFile && (
          <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="rounded-full bg-gray-100 p-2">
                <ImageIcon size={18} />
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="text-sm text-gray-500">Selected file</span>
                <span className="truncate text-sm font-medium">
                  {selectedFile.name}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onClear();
              }}
              className="ml-4 rounded-lg p-2 transition hover:bg-gray-100 shrink-0"
              aria-label="Remove selected file"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormFilePicker.displayName = "FormFilePicker";
