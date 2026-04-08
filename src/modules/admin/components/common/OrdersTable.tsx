import { OrdersTableBody } from "./OrdersTableBody";

export function OrdersTable() {
  return (
    <div className="w-full bg-(--neutral-semi-white) border border-(--neutral-light-gray) rounded-lg p-5">
      <table className="w-full ">
        <thead className="w-full">
          <tr className="w-full">
            <th className="w-[30%] text-left">Order Id</th>
            <th className="w-[14%] text-left">Customer</th>
            <th className="w-[14%] text-left">Date</th>
            <th className="w-[14%] text-left">Payment</th>
            <th className="w-[14%] text-left">Items</th>
            <th className="w-[14%] text-left">Total</th>
          </tr>
        </thead>
        <OrdersTableBody />
      </table>
    </div>
  );
}
