"use client";

import { Button } from "@/src/components/ui/Button";
import { FormHeader } from "../../components/FormHeader";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  LoginFormSchema,
} from "../services/validations/loginFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userSearchValue: "",
      password: "",
    },
  });

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col gap-8 box-border max-w-114 w-full  px-5 mx-auto mt-20 py-10 lg:mt-0  lg:py-0 lg:box-content lg:pl-22 lg:pr-20">
      <FormHeader
        header={"Sign In"}
        text={"Don't have an accout yet?"}
        linkText={"Sign Up"}
        href={"/auth/signup"}
      />
      <form
        className="flex flex-col gap-8 max-w-114 w-full"
        onSubmit={handleSubmit(() => {
          console.log("logindeba");
          reset();
        })}
      >
        <Input
          type={"text"}
          id={"userSearchValue"}
          placeholder={"Your username or email address"}
          {...register("userSearchValue")}
        />
        <PasswordInput register={register("password")} />
        <div className="flex justify-between items-center">
          <Checkbox
            id={"rememberMe"}
            defaultChecked={rememberMe}
            textHtmlFormat={
              <p className="text-(--neutral-light-grey)">Remember Me</p>
            }
            onChange={() => setRememberMe(!rememberMe)}
          />

          <Link href={"/auth/forgor-password"} className="text-black font-semibold leading-6.5">Forgot Password?</Link>
        </div>
        <Button
          text={isSubmitting ? "Signing In" : "Sign In"}
          mode={"solid"}
          rounded={"square"}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
