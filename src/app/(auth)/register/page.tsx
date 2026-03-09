import { validateRequest } from "@/src/auth/validate";
import RegisterPage from "@/src/modules/auth/register";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await validateRequest();

  if (session) {
    redirect("/");
  }
  return <RegisterPage />;
}
