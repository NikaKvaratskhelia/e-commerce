"use client";

import { useAdminOrders } from "../../hooks/queries/use-admin-orders";

function FormatDate({ date }: { date: string }) {
  const d = new Date(date);
  return <span>{d.toLocaleDateString()}</span>;
}

export function OrdersTableBody() {
  const { data } = useAdminOrders();

  return (
    <tbody>
      {data?.data?.map((o) => (
        <tr key={o.id} className="border-b border-(--neutral-light-grey)">
          <td className="py-5 pr-4 font-bold">{o.id}</td>
          <td className="py-5 pr-4">{o.user.name}</td>
          <td className="py-5 pr-4">
            <FormatDate date={o.createdAt} />
          </td>
          <td className="py-5 pr-4">
            <p className="font-medium px-2 py-1 text-sm bg-white rounded-full border text-center w-fit">{o.paymentMethod}</p>
          </td>
          <td className="py-5 pr-4 font-semibold">{o._count.orderItems}</td>
          <td className="py-5 pr-4 font-bold">${o.total.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  );
}
