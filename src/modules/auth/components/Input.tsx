import { ReactNode } from "react";

type InputProps = {
  type: string;
  id: string;
  placeholder: string;
  icon?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type,
  id,
  placeholder,
  icon,
  onChange,
}: InputProps) {
  return (
    <label
      htmlFor={id}
      className="border-b border-(--neutral-dark-white) pb-2 cursor-pointer flex justify-between items-center w-full"
    >
      <input
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        placeholder={placeholder}
        onChange={onChange}
        className="outline-none text-[16px] leading-6.5 w-full bg-transparent text-(--neutral-light-grey)"
      />
      {icon && (
        <div className="text-(--neutral-light-grey) w-5 h-3.5">{icon}</div>
      )}
    </label>
  );
}
