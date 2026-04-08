"use client";

import { useEffect } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/modules/auth/components/Input";
import { useUpdateProfile } from "@/src/modules/user/hooks/mutations/use-update-profile";
import { useCurrentUser } from "@/src/modules/user/hooks/queries/use-current-user";
import {
  putUserSchema,
  PutUserSchema,
} from "@/src/modules/user/server/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function UpdateProfileForm() {
  const { data } = useCurrentUser();
  const mutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PutUserSchema>({
    resolver: zodResolver(putUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!data?.data) return;

    reset({
      name: data.data.name ?? "",
      username: data.data.username ?? "",
      email: data.data.email ?? "",
    });
  }, [data, reset]);

  const onSubmit = async (values: PutUserSchema) => {
    await mutation.mutateAsync(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <h3 className="text-[20px] leading-8 font-semibold">Account Details</h3>

      <div className="flex flex-col gap-1">
        <Input
          variant="border"
          type="text"
          id="name"
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          variant="border"
          type="text"
          id="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          variant="border"
          type="email"
          id="email"
          placeholder="Your Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="self-start">
        <Button
          text="Save Changes"
          mode="solid"
          rounded="square"
          disabled={isSubmitting || mutation.isPending}
        />
      </div>
    </form>
  );
}
