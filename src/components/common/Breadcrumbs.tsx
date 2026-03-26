"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-sm my-4.5">
      <Link href="/">Home</Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        const label =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");

        const isLastLink = index === segments.length - 1;

        return (
          <span
            key={href}
            className={`flex items-center gap-2 ${isLastLink ? "font-semibold" : ""}`}
          >
            <span>&gt;</span>
            <Link href={href}>{label}</Link>
          </span>
        );
      })}
    </div>
  );
}
