import { Check } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  id: string;
  defaultChecked?: boolean;
  textHtmlFormat?: ReactNode;
  onChange: () => void;
};

export default function Checkbox({
  id,
  defaultChecked,
  textHtmlFormat,
  onChange,
}: Props) {
  return (
    <label className="cursor-pointer inline-flex">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={defaultChecked}
        readOnly
        hidden
      />

      <div className="flex gap-3 items-center">
        <div
          onClick={() => onChange()}
          className={`w-6 h-6 flex items-center justify-center rounded-sm border border-(--neutral-light-grey)
        ${defaultChecked ? "bg-(--primary)" : "bg-(--neutral-white)"}`}
        >
          {defaultChecked && (
            <Check width={24} height={16} className="text-white" />
          )}
        </div>

        <div
          className="text-(--neutral-light-grey) select-none"
          onClick={() => onChange()}
        >
          {textHtmlFormat}
        </div>
      </div>
    </label>
  );
}
