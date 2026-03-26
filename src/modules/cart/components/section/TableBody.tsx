"use client";

import { useCart } from "../../hooks/queries/use-cart";
import { TableRow } from "../common/TableRow";

export function TableBody() {
  const { data } = useCart();
  if (data?.data?.cartItems.length === 0)
    return (
      <tbody>
        <tr className="text-center mt-10 text-[30px] font-semibold">
          <td>
            <p className="py-10">Empty Cart</p>
          </td>
        </tr>
      </tbody>
    );
  return (
    <tbody>
      {data?.data?.cartItems.map((i) => (
        <TableRow key={i.id} cartItem={i} />
      ))}
    </tbody>
  );
}
