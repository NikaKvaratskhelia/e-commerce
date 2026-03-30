import { CheckoutHero } from "./components/sections/CheckoutHero";
import { Form } from "./components/sections/Form";
import { OrderSummary } from "./components/sections/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="max-w-280 mx-auto px-8 w1120:px-0 flex flex-col w-full gap-20 py-20">
      <CheckoutHero />
      <div className="flex flex-wrap items-start justify-between">
        <Form />
        <OrderSummary />
      </div>
    </div>
  );
}
