"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/ui/Button";
import { BillingForm } from "../common/BillingForm";
import { ContactForm } from "../common/ContactForm";
import { PaymentForm } from "../common/PaymentForm";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or fewer"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or fewer"),

  phoneNum: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+\d\s\-()]{7,20}$/, "Enter a valid phone number"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  street: z.string().min(1, "Street address is required"),

  country: z.string().min(1, "Country is required"),

  city: z.string().min(1, "City is required"),

  state: z.string().optional(),

  zipCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4,10}$/.test(val), {
      message: "Enter a valid ZIP code",
    }),

  cardNum: z
    .string()
    .min(1, "Card number is required")
    .regex(
      /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
      "Enter a valid 16-digit card number",
    ),

  cardExpiry: z
    .string()
    .min(1, "Expiration date is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),

  cardCvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "Enter a valid 3 or 4-digit CVC"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function Form() {
  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNum: "",
      email: "",
      street: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      cardNum: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order placed:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-160.75 w-full"
      >
        <ContactForm />
        <BillingForm />
        <PaymentForm />
        <Button
          text={"Place Order"}
          mode={"solid"}
          rounded={"square"}
          disabled={methods.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
}
