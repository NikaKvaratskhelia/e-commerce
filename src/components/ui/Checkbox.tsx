"use client";

import { Check } from "lucide-react";
import { ReactNode, useState } from "react";

type Props = {
  id: string;
  defaultChecked?: boolean;
  textHtmlFormat?: ReactNode;
};

export default function Checkbox({
  id,
  defaultChecked = false,
  textHtmlFormat,
}: Props) {
  const [value, setValue] = useState(defaultChecked);

  return (
    <label className="cursor-pointer inline-flex">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={value}
        readOnly
        hidden
      />

      <div className="flex gap-3">
        <div
          onClick={() => setValue(!value)}
          className={`w-6 h-6 flex items-center justify-center rounded-sm border border-(--neutral-light-grey)
        ${value ? "bg-(--primary)" : "bg-(--neutral-white)"}`}
        >
          {value && <Check width={24} height={16} className="text-white" />}
        </div>

        <div
          className="text-(--neutral-light-grey) select-none"
          onClick={() => setValue(!value)}
        >
          {textHtmlFormat}
        </div>
      </div>
    </label>
  );
}
