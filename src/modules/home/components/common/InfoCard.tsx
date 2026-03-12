import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  heading: string;
  text: string;
};

export function InfoCard({ icon, heading, text }: Props) {
  return (
    <div className="max-w-65.5 w-full min-h-49 sm:min-h-55 px-4 sm:px-8 py-8 sm:py-12 flex flex-col gap-4 bg-(--neutral-semi-white)">
      {icon}
      <div className="flex-col gap-2">
        <h2 className="leading-5.5 sm:leading-7 text-sm sm:text-[20px] font-medium">
          {heading}
        </h2>
        <p className="text-sm leading-5.5 text-(--neutral-light-grey)">
          {text}
        </p>
      </div>
    </div>
  );
}
