"use client";

import { useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput() {
  const [showPass, setShowPass] = useState(false);
  return (
    <Input
      type={showPass ? "text" : "password"}
      id={"password"}
      placeholder={"Password"}
      icon={
        showPass ? (
          <Eye onClick={() => setShowPass(false)} width={24} height={24}/>
        ) : (
          <EyeOff onClick={() => setShowPass(true)} width={24} height={24}/>
        )
      }
    />
  );
}
