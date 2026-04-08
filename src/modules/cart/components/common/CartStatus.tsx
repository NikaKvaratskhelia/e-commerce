import { Check } from "lucide-react";

type Props = {
  number: number;
  text: string;
  variant: "active" | "done" | "next";
};

export function CartStatus({ number, text, variant }: Props) {
  return (
    <div
      className={`flex gap-4.25 items-center py-6.5 w-[256px]
        ${variant === "done" ? "border-b-2 border-(--green)" : variant === "active" ? "border-b-2 border-(--primary)" : ""} 
        ${variant === "done" ? "text-(--green)!" : "text-(--primary)"} 
        ${variant === "next" ? "opacity-60" : "opacity-100"}`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center font-semibold text-white rounded-full ${variant === "done" ? "bg-(--green)" : "bg-(--primary)"}`}
      >
        {variant === "done" ? <Check /> : number}
      </div>
      <p className="leading-6.5 font-semibold">{text}</p>
    </div>
  );
}
