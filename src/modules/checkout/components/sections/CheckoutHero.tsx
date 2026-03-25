import { CartStatus } from "@/src/modules/cart/components/common/CartStatus";

export function CheckoutHero() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 pb-20">
      <h1 className="text-[40px] sm:text-[54px] leading-11 sm:leading-14.5 font-medium">
        Check Out
      </h1>
      <div className="flex gap-8 flex-wrap justify-center">
        <CartStatus number={1} text={"Shopping Cart"} variant={"done"} />
        <CartStatus number={2} text={"Checkout Details"} variant={"active"} />
        <CartStatus number={3} text={"Order Complete"} variant={"next"} />
      </div>
    </div>
  );
}
