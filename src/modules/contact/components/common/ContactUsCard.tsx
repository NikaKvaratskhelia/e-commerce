import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  header: string;
  text: string;
};

export function ContactUsCard({ icon, header, text }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center text-center px-8 py-4 max-w-89.25 w-full bg-(--neutral-semi-white) h-full">
      {icon}
      <h4 className="leading-4.5 text-(--neutral-light-grey) font-bold">
        {header}
      </h4>
      <p className="max-w-73.25 leading-6.5 font-semibold">{text}</p>
    </div>
  );
}
