"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import type { CheckoutFormValues } from "../sections/Form";

export function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

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
          {...register("cardNum")}
          error={errors.cardNum?.message}
        />

        <div className="w-full flex justify-between gap-2 sm:gap-6">
          <Input
            type="text"
            id="cardExpiry"
            label="EXPIRATION DATE"
            placeholder="MM/YY"
            {...register("cardExpiry")}
            error={errors.cardExpiry?.message}
          />

          <Input
            type="text"
            id="cardCvc"
            label="CVC"
            placeholder="CVC Code"
            {...register("cardCvc")}
            error={errors.cardCvc?.message}
          />
        </div>
      </div>
    </div>
  );
}
