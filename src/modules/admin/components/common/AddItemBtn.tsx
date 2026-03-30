"use client";

import { useState } from "react";

type AddItemBtnProps = {
  text: string;
  form: (onClose: () => void) => React.ReactNode;
};

export function AddItemBtn({ text, form }: AddItemBtnProps) {
  const [showForm, setShowForm] = useState(false);

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <div>
      <button
        type="button"
        className="cursor-pointer rounded-lg bg-(--green) px-4 py-2 font-bold text-white hover:bg-(--green)/80"
        onClick={handleOpen}
      >
        + Add {text}
      </button>

      {showForm && form(handleClose)}
    </div>
  );
}
