"use client";

import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z
    .email("გთხოვთ შეიყვანოთ სწორი იმეილი.")
    .min(1, "იმეილი სავალდებულოა."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    console.log(data);
    // TODO: resendit ubralod email gavugzavnot
    reset();
  };

  return (
    <div className="w-full max-w-122">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-2 border-b border-(--neutral-light-grey) py-3 text-(--neutral-light-grey)"
      >
        <div className="flex w-full items-center gap-2 text-(--primary)">
          <Mail width={24} height={24} strokeWidth={1.5} />

          <input
            type="email"
            placeholder="Email address"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="w-full bg-transparent leading-7 outline-none placeholder:text-(--neutral-light-grey)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer border-none outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
