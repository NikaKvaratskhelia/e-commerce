"use client";

import { useOrders } from "../../hooks/queries/use-orders";

export function Tbody() {
  const { data: orders, isLoading, error } = useOrders();

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-6 px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 animate-pulse bg-gray-200 h-8 w-40 rounded"></h2>
        <div className="w-full space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 h-16 w-full rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full px-4 py-8">
        <p className="text-red-500">Failed to load orders.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col w-full gap-6 px-4 py-8">
        <h2 className="text-[20px] leading-8 font-semibold mb-4">
          Orders History
        </h2>
        <p className="text-gray-500 mt-4">You have no past orders.</p>
      </div>
    );
  }

  return (
    <tbody className="flex flex-col gap-6 w-full">
      {orders.map((order) => (
        <tr
          key={order.id}
          className="grid grid-cols-4 justify-items-start border-b border-(--neutral-light-grey) pb-6"
        >
          <td className="text-sm lg:text-base text-wrap wrap-anywhere max-w-40 leading-5.5">
            {order.id}
          </td>
          <td className="text-sm lg:text-base leading-5.5">
            {formatDate(order.createdAt)}
          </td>
          <td className="text-sm lg:text-base leading-5.5">Delivered</td>
          <td className="text-sm lg:text-base leading-5.5">
            ${order.total.toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
