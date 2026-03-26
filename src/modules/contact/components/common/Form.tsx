"use client";

import { Button } from "@/src/components/ui/Button";
import { client } from "@/src/library/hono-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await client.api.contact.$post({ json: data });
      const parsed = await res.json();
      if (!res.ok || !parsed.success) {
        toast.error(parsed.message);
      }
      toast.success(parsed.message);      
    } catch (error) {
      console.log(error);
      toast.error("სერვერის ხარვეზი.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 w-full"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-xs leading-3 text-(--neutral-light-grey) font-bold"
        >
          FULL NAME
        </label>
        <input
          id="name"
          placeholder="Your Name"
          {...register("name", { required: true })}
          className="px-4 py-2 rounded-md border border-[#cbcbcb]"
        />
        {errors.name && <span>Name is required</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs leading-3 text-(--neutral-light-grey) font-bold"
        >
          EMAIL
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your Email"
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          className="px-4 py-2 rounded-md border border-[#cbcbcb]"
        />
        {errors.email && <span>Invalid email</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs leading-3 text-(--neutral-light-grey) font-bold">
          Message
        </label>
        <textarea
          placeholder="message"
          {...register("message", { required: true })}
          className="px-4 py-2 rounded-md border border-[#cbcbcb]"
        />
        {errors.message && <span>Message is required</span>}
      </div>

      <div className="max-w-47.5">
        <Button
          text={"Send Message"}
          mode={"solid"}
          rounded={"square"}
          disabled={false}
        />
      </div>
    </form>
  );
}
