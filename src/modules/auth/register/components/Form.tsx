import Checkbox from "@/src/components/ui/Checkbox";
import Button from "@/src/components/ui/Button";
import PasswordInput from "../../components/PasswordInput";
import Input from "../../components/Input";
import FormHeader from "../../components/FormHeader";

export default function Form() {
  return (
    <div className="flex flex-col gap-8 max-w-114 mx-auto">
      <FormHeader
        header={"Sign Up"}
        text={"Already have an account?"}
        linkText={"Sign In"}
        href={"/auth/login"}
      />
      <form className="flex flex-col gap-8">
        <Input type={"text"} id={"name"} placeholder={"Your Name"} />
        <Input type={"text"} id={"userName"} placeholder={"Username"} />
        <Input type={"email"} id={"email"} placeholder={"Email address"} />
        <PasswordInput />
        <Checkbox
          id={"agree"}
          textHtmlFormat={
            <p className="text-(--neutral-light-grey)">
              I agree with{" "}
              <span className="text-black font-semibold">Privacy Policy</span>{" "}
              and <span className="text-black font-semibold">Terms of Use</span>
            </p>
          }
        />
        <Button text={"Sign Up"} mode={"solid"} rounded={"square"} />
      </form>
    </div>
  );
}
