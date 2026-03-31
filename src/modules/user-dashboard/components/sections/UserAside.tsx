import { NavLink } from "../common/NavLink";
import { logout } from "../../services/action";
import Username from "../common/Username";
import { validateRequest } from "@/src/auth/validate";

export async function UserAside() {
  const { user } = await validateRequest();

  return (
    <div className="flex flex-col items-start gap-10 py-10 px-4 bg-(--neutral-semi-white) max-w-65.5 w-full">
      <Username />
      <div className="flex flex-col gap-4 w-full">
        <NavLink text={"Account"} href={"/account"} />
        <NavLink text={"Orders"} href={"/orders"} />
        <NavLink text={"Wishlist"} href={"/wishlist"} />
        {user && user.role === "admin" && (
          <NavLink text="Admin Dashboard" href="/dashboard" />
        )}
        <form action={logout} className="w-full">
          <button
            type="submit"
            className={`cursor-pointer w-full text-left text-(--neutral-light-grey) duration-300 transition-all leading-6.5 pt-2 font-semibold hover:text-(--primary) border-b border-(--neutral-semi-white) hover:border-(--primary)`}
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
