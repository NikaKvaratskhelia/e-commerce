"use client";

import { useOrders } from "../../hooks/queries/use-orders";

export function ResponsiveTable() {
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
    <div className="flex flex-col lg:hidden w-full space-y-8">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col w-full pb-8 border-b border-gray-100 last:border-0 text-sm"
        >
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-400">Number ID</span>
            <span className="text-gray-800 font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-400">Dates</span>
            <span className="text-gray-800 font-medium">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-400">Status</span>
            <span className="text-gray-800 font-medium">Delivered</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Price</span>
            <span className="text-gray-800 font-medium">
              $ {order.total.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
