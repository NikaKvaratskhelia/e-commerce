import { TotalSection } from "../common/TotalSection";
import { ResponsiveCartLayout } from "./ResponsiveCartLayout";
import { TableBody } from "./TableBody";

export function CartTable() {
  return (
    <div className="flex gap-6 items-center sm:items-start w-full flex-col w1120:flex-row">
      <table className="w-full hidden sm:table">
        <thead className="w-full">
          <tr className="text-[18px] w-full font-semibold leading-6.5 grid grid-cols-[2fr_1fr_1fr_1fr]  justify-items-start pb-6 border-b border-(--primary)">
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <TableBody />
      </table>
      <ResponsiveCartLayout />
      <TotalSection />
    </div>
  );
}
