"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Package, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/companies", label: "Companies", icon: Building2 },
  { href: "/dashboard/products", label: "Products", icon: Package },
];

export function MobileNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <nav className="flex border-b border-gray-200 bg-white px-4 lg:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
            isActive(href)
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
