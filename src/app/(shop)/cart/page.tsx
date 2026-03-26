import { requireAuth } from "@/src/auth/helpers";
import { redirect } from "next/navigation";
import CartPage from "@/src/modules/cart";

export default async function page() {
  
  try {
    await requireAuth();
  } catch {
    redirect("/login");
  }

  return <CartPage />;
}
