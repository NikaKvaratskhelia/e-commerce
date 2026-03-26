"use client";

import { redirect, useParams } from "next/navigation";
import { DiscountExpiresSkeleton } from "../skeletons/DiscountExpiresSkeleton";
import { useCountdown } from "@/src/hooks/use-countdown";
import { useProductDetails } from "../../../hooks/queries/use-product-details";

export function DiscountExpires() {
  const id = useParams().id as string;
  if (!id) redirect("/");

  const now = new Date();

  const query = useProductDetails(id);
  const discount =
    query.data?.data?.discounts?.find(
      (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
    ) ?? null;

  const endDate = discount ? new Date(discount.discountEndDate) : null;
  const timeLeft = useCountdown(endDate);

  if (query.isLoading) return <DiscountExpiresSkeleton />;
  if (!query.data?.data) redirect("/");
  if (!discount || !timeLeft) return null;

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="flex flex-col items-start gap-3 py-6 border-t border-(--neutral-dark-white)">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
        Offer expires in:
      </p>
      <div className="flex items-start gap-3">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center w-15 h-15 bg-(--neutral-semi-white) text-[34px] font-medium leading-9.5 text-(--primary)">
              {String(value).padStart(2, "0")}
            </div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
