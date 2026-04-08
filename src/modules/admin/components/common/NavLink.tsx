"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  collapsed: boolean;
};

export function NavLink({ href, label, icon: Icon, collapsed }: Props) {
  const path = usePathname()
  const isActive = path.includes(href);
  return (
    <Link
      href={href}
      className={`
        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-200 ease-in-out cursor-pointer no-underline
        ${
          isActive
            ? "bg-indigo-500/20 text-indigo-300"
            : "text-slate-400 hover:text-slate-100 hover:bg-white/6"
        }
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-indigo-400 rounded-r-full" />
      )}

      <Icon
        size={18}
        strokeWidth={1.8}
        className={`shrink-0 transition-colors duration-200 ${
          isActive
            ? "text-indigo-400"
            : "text-slate-500 group-hover:text-slate-300"
        }`}
      />

      <span
        className={`text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-300 overflow-hidden ${
          collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
      >
        {label}
      </span>

      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1.5 bg-slate-800 text-slate-100 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150 shadow-xl border border-white/10 z-50">
          {label}
        </span>
      )}
    </Link>
  );
}
