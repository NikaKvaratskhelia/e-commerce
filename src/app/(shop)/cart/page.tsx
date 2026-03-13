import { requireAuth } from "@/src/auth/helpers";
import { redirect } from "next/navigation";

export default async function CartPage() {
  try {
    await requireAuth();
  } catch {
    redirect("/login");
  }
  return <div>page</div>;
}
