import { ReactNode } from "react";

type InputProps = {
  type: string;
  id: string;
  placeholder: string;
  icon?: ReactNode;
};

export default function Input({ type, id, placeholder, icon }: InputProps) {
  return (
    <label
      htmlFor={id}
      className="border-b border-(--neutral-dark-white) pb-2 cursor-pointer flex justify-between items-center"
    >
      <input
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        placeholder={placeholder}
        className="outline-none text-[16px] leading-6.5 w-full bg-transparent text-(--neutral-light-grey)"
      />
      <div className="text-(--neutral-light-grey) w-5 h-3.5">{icon}</div>
    </label>
  );
}
