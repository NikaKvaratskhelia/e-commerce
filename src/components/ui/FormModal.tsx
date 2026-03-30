import { X } from "lucide-react";
import { ReactNode } from "react";

type FormModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
};

export function FormModal({
  title,
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-xl",
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className={`flex w-full ${maxWidth} flex-col gap-5 rounded-2xl bg-(--neutral-semi-white) p-6 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-black/5"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
