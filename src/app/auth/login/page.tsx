import { validateRequest } from "@/src/auth/validate";
import LoginPage from "@/src/modules/auth/login";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await validateRequest();

  if (session) {
    redirect("/");
  }

  return <LoginPage />;
}
