"use client";

import Checkbox from "@/src/components/ui/Checkbox";
import Button from "@/src/components/ui/Button";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";
import FormHeader from "../../components/FormHeader";
import { registerAction } from "../services/actions";
import { useState } from "react";
import {
  postUserSchema,
  PostUserSchema,
} from "../services/validations/post.validation";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [values, setValues] = useState<PostUserSchema>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [checked, setChecked] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = postUserSchema.safeParse(values);
    console.log(values);
    console.log(checked);

    if (!result.success || !values) {
      toast.error("არასწორი ველები!");
      return;
    }

    registerAction(values);
    toast.success("რეგისტრაცია წარმატებით შესრულდა!");
    redirect("/auth/login");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-8 box-border max-w-114 w-full  px-5 mx-auto mt-20 py-10 lg:mt-0  lg:py-0 lg:box-content lg:pl-22 lg:pr-20">
      <FormHeader
        header={"Sign Up"}
        text={"Already have an account?"}
        linkText={"Sign In"}
        href={"/auth/login"}
      />
      <form
        className="flex flex-col gap-8 max-w-114 w-full"
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          id={"name"}
          placeholder={"Your Name"}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          id={"username"}
          placeholder={"Username"}
          onChange={handleChange}
        />
        <Input
          type={"email"}
          id={"email"}
          placeholder={"Email address"}
          onChange={handleChange}
        />
        <PasswordInput onChange={handleChange} />
        <Checkbox
          id={"agree"}
          textHtmlFormat={
            <p className="text-(--neutral-light-grey) text-[12px] sm:text-[16px]">
              I agree with{" "}
              <span className="text-black font-semibold">Privacy Policy</span>{" "}
              and <span className="text-black font-semibold">Terms of Use</span>
            </p>
          }
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        <Button text={"Sign Up"} mode={"solid"} rounded={"square"} />
      </form>
    </div>
  );
}
