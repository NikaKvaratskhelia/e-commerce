"use client";

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useStats } from "../../hooks/queries/use-stats";
import { ProgressCard } from "../common/ProgressCard";

export function ProgressLayout() {
  const { data } = useStats();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      <ProgressCard
        text={"Total Revenue"}
        current={`$${(data?.revenue.current || 0).toFixed(2)}`}
        last={data?.revenue.last || 0}
        growth={data?.revenue.growth || 0}
        icon={<DollarSign />}
      />

      <ProgressCard
        text={"Orders"}
        current={data?.orders.current || 0}
        last={data?.orders.last || 0}
        growth={data?.orders.growth || 0}
        icon={<ShoppingCart />}
      />

      <ProgressCard
        text={"Products"}
        current={data?.products.total || 0}
        last={data?.products.addedLastMonth || 0}
        growth={data?.products.growth || 0}
        icon={<Package />}
      />

      <ProgressCard
        text={"Users"}
        current={data?.users.total || 0}
        icon={<Users />}
      />
    </div>
  );
}
