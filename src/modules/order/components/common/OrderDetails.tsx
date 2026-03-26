"use client";

import { useParams } from "next/navigation";
import { useOrder } from "../../hooks/queries/use-order";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function OrderDetails() {
  const orderId = useParams().orderId as string;  
  const { data } = useOrder(orderId);
  

  return (
    <div className="flex flex-col gap-6 max-w-fit w-full mx-auto">
      <p className="flex w-full justify-between items-center gap-6">
        <span>Order Code: </span>
        <span>{data?.data?.id}</span>
      </p>

      <p className="flex w-full justify-between items-center gap-6">
        <span>Created At: </span>
        <span>
          {formatDate(data?.data?.createdAt ?? new Date().toISOString())}
        </span>
      </p>

      <p className="flex w-full justify-between items-center gap-6">
        <span>Order Code: </span>
        <span>{data?.data?.total}</span>
      </p>

      <p className="flex w-full justify-between items-center gap-6">
        <span>Order Code: </span>
        <span>{data?.data?.paymentMethod}</span>
      </p>
    </div>
  );
}
