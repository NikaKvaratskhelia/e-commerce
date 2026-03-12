"use client";

import { Button } from "@/src/components/ui/Button";
import { client } from "@/src/library/hono-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  code: string;
};

export function EmailVerificationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(form: FormValues) {
    try {
      const res = await client.api.verify.$post({ json: { code: form.code } });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      toast.error("სერვერის შეცდომა. მოგვიანებით სცადეთ.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm w-full border rounded-xl p-6 space-y-4"
    >
      <div>
        <h2 className="text-xl font-semibold">Email Verification</h2>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          className="border rounded-md px-4 py-3 text-center tracking-[0.4em]"
          {...register("code", {
            required: "Verification code is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Code must be exactly 6 digits",
            },
          })}
        />

        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}
      </div>

      <Button
        text={"Verify"}
        mode={"solid"}
        rounded={"square"}
        disabled={false}
      />
    </form>
  );
}
