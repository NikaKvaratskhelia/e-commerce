"use client";

import { useParams } from "next/navigation";
import { useOrder } from "../../hooks/queries/use-order";
import { OrderItems } from "./OrderItems";

export default function OrderItemsLayout() {
  const orderId = useParams().orderId as string;

  const { data } = useOrder(orderId);
  console.log(data);
  
  return (
    <div className="flex flex-wrap gap-10">
      {data?.data?.orderItems.map((i) => (
        <OrderItems
          key={i.id}
          imgUrl={i.productColor.photos[0].url}
          qty={i.quantity}
        />
      ))}
    </div>
  );
}
