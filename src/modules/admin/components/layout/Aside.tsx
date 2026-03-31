"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ClipboardList,
  Users,
  FileText,
  ChevronsLeft,
  Zap,
} from "lucide-react";
import { NavLink } from "../common/NavLink";
import Link from "next/link";

const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Products", href: "/admin-products", icon: Package },
      { label: "Categories", href: "/categories", icon: FolderOpen },
      { label: "Orders", href: "/admin-orders", icon: ClipboardList },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Blogs", href: "/admin-blogs", icon: FileText },
    ],
  },
];

export function Aside() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        sticky top-0 flex flex-col h-screen bg-[#13121a] border-r border-white/6
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-17" : "w-60"}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/6 min-h-16">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Zap size={16} className="text-white" fill="white" />
        </div>

        <span
          className={`font-semibold text-[15px] text-slate-100 tracking-tight whitespace-nowrap transition-all duration-300 overflow-hidden ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          AdminPanel
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-5 scrollbar-none h-full flex flex-col">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p
              className={`px-3 mb-1.5 text-[10px] font-semibold tracking-widest uppercase text-slate-600 whitespace-nowrap transition-all duration-200 ${
                collapsed ? "opacity-0 h-0 mb-0 overflow-hidden" : "opacity-100"
              }`}
            >
              {section.title}
            </p>

            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
        <Link
          href="/"
          className="
        inline-flex items-center justify-center
        px-4 py-2
        text-sm font-medium
        text-white
        bg-(--primary)
        rounded-xl
        transition-all duration-200

        hover:opacity-90
        active:scale-[0.98]

        focus:outline-none
        focus:ring-2
        focus:ring-(--primary)
        focus:ring-offset-2
      "
        >
          Back to Shop
        </Link>
      </nav>

      <div className="px-2.5 pb-5 pt-2 border-t border-white/6">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/6 transition-all duration-200 cursor-pointer"
        >
          <ChevronsLeft
            size={18}
            strokeWidth={1.8}
            className={`shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
          <span
            className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
