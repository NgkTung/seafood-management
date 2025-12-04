"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  SquareKanban,
  Package,
  ClipboardList,
  BarChart2,
  Truck,
  Settings,
} from "lucide-react";

type SidebarProps = {
  mobile?: boolean;
};

export default function Sidebar({ mobile = false }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/qc", label: "Quality Control", icon: ClipboardList },
    { href: "/inventory", label: "Inventory", icon: Package },
    { href: "/orders", label: "Orders", icon: SquareKanban },
    { href: "/reports", label: "Reports", icon: BarChart2 },
    { href: "/shipment", label: "Shipment", icon: Truck },
    { href: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "h-full w-64 border-r bg-white flex flex-col",
        mobile && "w-full"
      )}
    >
      <div className="px-4 py-4 border-b font-semibold text-xl">Menu</div>

      <nav className="flex-1 px-2 py-3 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
