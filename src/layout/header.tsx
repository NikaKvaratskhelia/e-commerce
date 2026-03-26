import Image from "next/image";
import Link from "next/link";
import { NavLink } from "../components/common/NavLink";
import { BurgerMenu } from "./burgerMenu";
import { validateRequest } from "../auth/validate";
import { CartPopUp } from "../modules/cart/components/section/CartPopUp";

export async function Header() {
  const isAuthenticated = (await validateRequest()).session !== null;

  return (
    <header className="max-w-280 w-full mx-auto px-8 py-4">
      <nav className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <BurgerMenu isAuthenticated={isAuthenticated} />
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              alt={"Company logo"}
              width={105}
              height={24}
              loading="eager"
              className="w-17.5 sm:w-26.25 h-6"
            />
          </Link>
        </div>

        <ul className="hidden gap-10 sm:flex">
          <li>
            <NavLink href={"/"} text="Home" />
          </li>
          <li>
            <NavLink href={"/products"} text="Shop" />
          </li>
          <li>
            <NavLink href={"/contact"} text="Contact Us" />
          </li>
        </ul>

        <div className="flex items-center justify-center gap-4">
          <Link href={""} className="hidden sm:block">
            <Image
              src={"/search 02.svg"}
              alt="search icon"
              width={24}
              height={24}
            />
          </Link>
          <Link href={"/dashboard"} className="hidden sm:block">
            <Image
              src={"/user-circle.svg"}
              alt="user icon"
              width={24}
              height={24}
            />
          </Link>

          <CartPopUp />
        </div>
      </nav>
    </header>
  );
}
