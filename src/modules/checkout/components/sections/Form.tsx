"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/Button";
import { BillingForm } from "../common/BillingForm";
import { ContactForm } from "../common/ContactForm";
import { PaymentForm } from "../common/PaymentForm";
import {
  CheckoutFormValues,
  checkoutSchema,
} from "../../services/validations/checkoutValidation";
import { toast } from "sonner";
import { order } from "../../services/action";
import { useRouter } from "next/navigation";

export function Form() {
  const router = useRouter();
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

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log("Order placed:", data);
    const result = checkoutSchema.safeParse(data);
    if (!result.success) {
      toast.error("არასწორი ველები!");
      return;
    }

    try {
      const res = await order(data);
      router.push(`/cart  /order/${res.orderId}`);
      methods.reset();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error("სერვერის შეცდომა. სცადე თავიდან.");
    }
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
