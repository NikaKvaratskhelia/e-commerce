"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  href: string;
};
export function NavLink({ text, href }: Props) {
  const path = usePathname();
  const isActive = path.includes(href.toLowerCase());

  return (
    <Link
      href={href}
      className={`text-(--neutral-light-grey) w-full leading-6.5 pt-2 font-semibold border-b border-(--neutral-semi-white) hover:border-(--primary) hover:text-(--primary) transition-all duration-300 cursor-pointer text-left ${isActive ? "text-(--primary) border-b border-(--primary)" : ""}`}
    >
      {text}
    </Link>
  );
}
