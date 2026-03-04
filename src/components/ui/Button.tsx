type ButtonProps = {
  text: string;
  mode: "outline" | "solid";
  rounded: "rounded" | "square";
};

export default function Button({ text, mode, rounded }: ButtonProps) {
  const modeClass =
    mode === "outline"
      ? "border border-(--primary) bg-transparent text-(--neutral-black)"
      : "bg-(--primary) text-white";

  const roundedClass =
    rounded === "rounded" ? "rounded-[80px]" : "rounded-[8px]";

  return (
    <div className={`${modeClass} ${roundedClass} text-[16px] font-medium px-10 py-1.5 max-w-fit w-full`}>{text}</div>
  );
}
