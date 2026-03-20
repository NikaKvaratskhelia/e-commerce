"use client";

import Link from "next/link";
import { useCart } from "../../hooks/queries/use-cart";
import { Button } from "@/src/components/ui/Button";

export function TotalSection() {
  const { data } = useCart();

  return (
    <div className="flex flex-col border border-(--primary) rounded-md max-w-100 w-full p-6 items-center gap-4">
      <h3 className="font-semibold text-[20px] leading-8 w-full flex items-center justify-between">
        Total:<span> ${data?.data?.total}</span>
      </h3>
      <Link href={"/checkout"} className="w-full">
        <Button
          text={"Checkout"}
          mode={"solid"}
          rounded={"square"}
          disabled={false}
        />
      </Link>
    </div>
  );
}
