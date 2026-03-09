import Image from "next/image";
import Link from "next/link";
import NavLink from "../components/common/NavLink";
import BurgerMenu from "./burgerMenu";
import { validateRequest } from "../auth/validate";

export default async function Header() {
  const isAuthenticated = (await validateRequest()).session !== null;
  return (
    <header className="max-w-280 w-full mx-auto px-8 py-4">
      <nav className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <BurgerMenu isAuthenticated={isAuthenticated} />
          <Link href={"/shop/home"}>
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
            <NavLink href={"/shop"} text="Home" />
          </li>
          <li>
            <NavLink href={"/shop/products"} text="Shop" />
          </li>
          <li>
            <NavLink href={"/shop/contact"} text="Contact Us" />
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
          <Link href={"/shop/dashboard"} className="hidden sm:block">
            <Image
              src={"/user-circle.svg"}
              alt="user icon"
              width={24}
              height={24}
            />
          </Link>
          <Link href={"/shop/cart"} className="flex gap-1 items-center">
            <Image
              src={"/shoppingBagIcon.svg"}
              alt="Cart icon"
              width={24}
              height={24}
            />
            <div className="h-5 w-5 p-1 box-border rounded-full bg-black">
              {/* aq unda daematos cart itemebis raodenoba */}
              <p className="text-white text-[12px] text-center leading-2.5 font-bold">
                0
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
