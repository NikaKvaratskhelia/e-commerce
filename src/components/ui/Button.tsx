"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  text: string;
  mode: "outline" | "solid";
  rounded: "rounded" | "square";
};

export default function Button({ text, mode, rounded }: ButtonProps) {
  const { pending } = useFormStatus();

  const modeClass =
    mode === "outline"
      ? "border border-(--primary) bg-transparent text-(--neutral-black)"
      : "bg-(--primary) text-white";

  const roundedClass =
    rounded === "rounded" ? "rounded-[80px]" : "rounded-[8px]";

  return (
    <button
      className={`${modeClass} ${roundedClass} text-[16px] font-medium px-10 py-2.5 text-center w-full leading-7 select-none cursor-pointer flex items-center justify-center`}
    >
      {pending ? <Loader className="animation-spin" /> : text}
    </button>
  );
}
