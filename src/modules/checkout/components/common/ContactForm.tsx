"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import type { CheckoutFormValues } from "../sections/Form";

export function ContactForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="max-w-160.75 w-full flex flex-col gap-6 px-4 sm:px-6 py-6 sm:py-10 border border-(--neutral-light-grey) rounded-sm">
      <h2 className="leading-6.5 sm:leading-7 sm:text-xl font-medium">
        Contact Information
      </h2>

      <div className="flex flex-col gap-6">
        <div className="w-full flex justify-between gap-2 sm:gap-6">
          <Input
            type="text"
            id="firstName"
            label="FIRST NAME"
            placeholder="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <Input
            type="text"
            id="lastName"
            label="LAST NAME"
            placeholder="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          type="tel"
          id="phoneNum"
          label="PHONE NUMBER"
          placeholder="Phone Number"
          {...register("phoneNum")}
          error={errors.phoneNum?.message}
        />

        <Input
          type="email"
          id="email"
          label="EMAIL ADDRESS"
          placeholder="Your Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
    </div>
  );
}
