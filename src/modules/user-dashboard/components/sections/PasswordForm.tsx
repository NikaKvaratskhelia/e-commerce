'use client'

import { Button } from "@/src/components/ui/Button";
import { PasswordInput } from "@/src/modules/auth/components/PasswordInput";
import { UseUpdatePassword } from "@/src/modules/user/hooks/mutations/use-update-password";
import {
  password_schema,
  PasswordSchema,
} from "@/src/modules/user/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function PasswordForm() {
  const mutation = UseUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(password_schema),
    defaultValues: {
      oldPass: "",
      newPass: "",
    },
  });

  const onSubmit = async (data: PasswordSchema) => {
    await mutation.mutateAsync(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-[20px] leading-8 font-semibold">Update Password</h3>

      <div className="flex flex-col gap-1">
        <PasswordInput register={register("oldPass")} />
        {errors.oldPass && (
          <p className="text-sm text-red-500">{errors.oldPass.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput register={register("newPass")} />
        {errors.newPass && (
          <p className="text-sm text-red-500">{errors.newPass.message}</p>
        )}
      </div>

      <div className="self-start">
        <Button
          text="Update Password"
          mode="solid"
          rounded="square"
          disabled={isSubmitting || mutation.isPending}
        />
      </div>
    </form>
  );
}
