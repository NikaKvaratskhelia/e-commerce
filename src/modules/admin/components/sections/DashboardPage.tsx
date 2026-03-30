import { ProgressLayout } from "./ProgressLayout";
import { RecentOrders } from "./RecentOrders";
import { RevenueOverview } from "./RevenueChart";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <h1 className="text-[32px] font-bold">Dashboard</h1>
      <p className="text-sm font-semibold text-(--neutral-light-grey)">
        Welcome to the admin dashboard! Here you can manage your store, view
        orders, and analyze sales data.
      </p>

      <div className="mt-8 flex flex-col gap-10">
        <ProgressLayout />
        <div className="flex gap-6 w-full justify-between">
          <RevenueOverview />
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
