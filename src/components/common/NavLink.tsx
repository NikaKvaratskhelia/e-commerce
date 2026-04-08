"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  text: string;
};

export function NavLink({ href, text }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`text-[14px] leading-6 font-medium ${isActive ? "text-(--neutral-black)" : "text-(--neutral-light-grey)"}`}
    >
      {text}
    </Link>
  );
}
