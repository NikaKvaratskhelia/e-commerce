"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import type { CheckoutFormValues } from "../sections/Form";

export function BillingForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="max-w-160.75 w-full flex flex-col gap-6 px-4 sm:px-6 py-6 sm:py-10 border border-(--neutral-light-grey) rounded-sm">
      <h2 className="leading-6.5 sm:leading-7 sm:text-xl font-medium">
        Shipping Address
      </h2>

      <div className="flex flex-col gap-6">
        <Input
          type="text"
          id="street"
          label="STREET ADDRESS *"
          placeholder="Street Address"
          {...register("street")}
          error={errors.street?.message}
        />

        <Input
          type="text"
          id="country"
          label="COUNTRY *"
          placeholder="Country"
          {...register("country")}
          error={errors.country?.message}
        />

        <Input
          type="text"
          id="city"
          label="TOWN / CITY *"
          placeholder="Town / City"
          {...register("city")}
          error={errors.city?.message}
        />

        <div className="w-full flex justify-between gap-2 sm:gap-6">
          <Input
            type="text"
            id="state"
            label="STATE"
            placeholder="State"
            {...register("state")}
            error={errors.state?.message}
          />

          <Input
            type="text"
            id="zipCode"
            label="ZIP CODE"
            placeholder="ZIP Code"
            {...register("zipCode")}
            error={errors.zipCode?.message}
          />
        </div>
      </div>
    </div>
  );
}
