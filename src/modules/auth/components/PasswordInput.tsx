"use client";

import { useState } from "react";
import { Input } from "./Input";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn;
  error?: string;
};

export function PasswordInput({ register, error }: Props) {
  const [showPass, setShowPass] = useState(false);

  return (
    <Input
      type={showPass ? "text" : "password"}
      id="password"
      placeholder="Password"
      autoComplete="new-password"
      error={error}
      {...register}
      icon={
        showPass ? (
          <Eye
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setShowPass(false)}
          />
        ) : (
          <EyeOff
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setShowPass(true)}
          />
        )
      }
    />
  );
}
