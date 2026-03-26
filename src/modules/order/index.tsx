import Link from "next/link";
import { OrderDetails } from "./components/common/OrderDetails";
import OrderItemsLayout from "./components/common/OrderItemsLayout";
import { OrderHero } from "./components/sections/OrderHero";
import { Button } from "@/src/components/ui/Button";
import { OrderHeader } from "./components/common/OrderHeader";

export default function OrderPage() {
  return (
    <div className="flex flex-col py-20 gap-20 max-w-280 mx-auto items-center">
      <OrderHero />
      <div className="flex flex-col gap-10 py-20 px-23.75 items-center max-w-184.5 mx-auto shadow-[30px_32px_48px_-48px_rgba(18,18,18,0.1)]">
        <OrderHeader />
        <OrderItemsLayout />
        <OrderDetails />
        <Link href={"/profile/orders"}>
          <Button
            text={"Purchase History"}
            mode={"solid"}
            rounded={"rounded"}
            disabled={false}
          />
        </Link>
      </div>
    </div>
  );
}
