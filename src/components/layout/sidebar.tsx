"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DRFlag } from "@/components/ui/dr-flag";
import { Building2, Package, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/companies", label: "Companies", icon: Building2 },
  { href: "/dashboard/products", label: "Products", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden w-56 shrink-0 border-r border-gray-200 bg-white lg:block">
      <div className="flex h-14 items-center gap-2.5 border-b border-gray-200 px-5">
        <DRFlag className="h-5 w-auto rounded-sm shadow-sm" />
        <span className="text-sm font-bold text-gray-900">DR Market Research</span>
      </div>
      <nav className="space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive(href)
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
