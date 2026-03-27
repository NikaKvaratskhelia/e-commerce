import { Input } from "./Input";

export function PaymentForm() {
  return (
    <div className="max-w-160.75 w-full flex flex-col gap-6 px-4 sm:px-6 py-6 sm:py-10 border border-(--neutral-light-grey) rounded-sm">
      <h2 className="leading-6.5 sm:leading-7 sm:text-xl font-medium">
        Payment Information
      </h2>

      <div className="flex flex-col gap-6">
        <Input
          type="text"
          id="cardNum"
          label="CARD NUMBER"
          placeholder="1234 5678 9012 3456"
        />

        <div className="w-full flex justify-between gap-2 sm:gap-6">
          <Input
            type="text"
            id="cardExpiry"
            label="EXPIRATION DATE"
            placeholder="MM/YY"
          />

          <Input type="text" id="cardCvc" label="CVC" placeholder="CVC Code" />
        </div>
      </div>
    </div>
  );
}
