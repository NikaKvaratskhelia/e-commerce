import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

type ProgressCardProps = {
  text: string;
  current: number | string;
  last?: number;
  growth?: number;
  icon: ReactNode;
};

export function ProgressCard({
  text,
  current,
  last,
  growth,
  icon,
}: ProgressCardProps) {

  const showGrowth = growth !== undefined && last !== undefined;

  return (
    <div className="max-w-75 rounded-lg border border-(--neutral-semi-white) bg-white p-4 shadow-md flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-(--neutral-light-grey) font-bold">{text}</h3>
        {icon}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[24px] font-semibold">{current}</p>

        {showGrowth && (
          <p className="flex items-center gap-2 text-sm text-(--green) font-semibold">
            <TrendingUp size={16} />
            <span>
              +{growth}% from last month (${last.toFixed(2)})
            </span>
          </p>
        )}
      </div>
    </div>
  );
}