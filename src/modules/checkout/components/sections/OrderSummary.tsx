import OrderItemsSection from "../common/OrderItemsSection";

export function OrderSummary() {
  return (
    <div className="flex flex-col gap-4 border border-(--neutral-light-grey) rounded-sm py-4 px-6 max-w-103.25 w-full">
      <h2 className="leading-6.5 sm:leading-7 sm:text-xl font-medium">
        Order Summary
      </h2>
      <OrderItemsSection />
    </div>
  );
}
