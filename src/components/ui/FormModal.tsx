"use client";

import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div
        className={`flex w-full ${maxWidth} animate-slide-up flex-col gap-5 rounded-2xl bg-(--neutral-white) p-6 shadow-2xl ring-1 ring-black/5`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-(--neutral-black)">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-(--neutral-light-grey) transition-all hover:bg-black/5 hover:text-black active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="pt-2">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
