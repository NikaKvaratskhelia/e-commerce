"use client";

import { useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPass, setShowPass] = useState(false);
  return (
    <Input
      type={showPass ? "text" : "password"}
      id={"password"}
      placeholder={"Password"}
      onChange={onChange}
      icon={
        showPass ? (
          <Eye onClick={() => setShowPass(false)} width={24} height={24} />
        ) : (
          <EyeOff onClick={() => setShowPass(true)} width={24} height={24} />
        )
      }
    />
  );
}
