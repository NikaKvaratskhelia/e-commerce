import { OrdersTable } from "../common/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-[24px]  font-medium">Products</h2>
      </div>

      <OrdersTable />
    </div>
  );
}
