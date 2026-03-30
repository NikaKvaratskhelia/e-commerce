"use client";

import { useOrders } from "../../hooks/queries/use-orders";

export function RecentOrders() {
  const { data } = useOrders();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[24px] font-bold">Recent Orders</h2>
      <p className="text-sm font-semibold text-(--neutral-light-grey)">
        Here you can see the most recent orders placed by customers.
      </p>

      <div>
        {data?.data.map((order) => (
          <div
            key={order.id}
            className="border border-(--neutral-semi-white) bg-white p-4 shadow-md"
          >
            <h3 className="text-[18px] font-bold">{order.user.name}</h3>
            <p className="text-sm text-(--neutral-light-grey)">
              Order ID: {order.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
