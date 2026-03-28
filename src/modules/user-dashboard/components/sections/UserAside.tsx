import { requireAuth } from "@/src/auth/helpers";
import { NavLink } from "../common/NavLink";
import { logout } from "../../services/action";

export async function UserAside() {
  const { user } = await requireAuth();
  return (
    <div className="flex flex-col items-start gap-10 py-10 px-4 bg-(--neutral-semi-white) max-w-65.5 w-full">
      <h2 className="text-center w-full text-[20px] leading-8 font-semibold">
        {user.username}
      </h2>
      <div className="flex flex-col gap-4 w-full">
        <NavLink text={"Account"} href={"/dashboard/account"} />
        <NavLink text={"Orders"} href={"/dashboard/orders"} />
        <NavLink text={"Wishlist"} href={"/dashboard/wishlist"} />
        <form action={logout} className="w-full">
          <button
            type="submit"
            className={`cursor-pointer w-full text-left text-(--neutral-light-grey) duration-300 transition-all leading-6.5 pt-2 font-semibold hover:text-(--primary) hover:border-b`}
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
