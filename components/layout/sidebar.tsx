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
  Boxes,
  Shrimp,
  MapPinHouse,
} from "lucide-react";
import { useProfile } from "@/hooks/auth/profile";

type SidebarProps = {
  mobile?: boolean;
};

export default function Sidebar({ mobile = false }: SidebarProps) {
  const pathname = usePathname();
  const { data } = useProfile();
  const permissions = data?.user?.permissions || [];

  const can = (perm: string) => {
    if (permissions.includes("*")) return true;
    return permissions.includes(perm);
  };

  const links = [
    { href: "/dashboard", label: "Trang điều khiển", icon: Home, perm: "" },
    { href: "/batches", label: "Lô hàng", icon: Boxes, perm: "batch.view" },
    {
      href: "/qc",
      label: "Kiểm soát chất lượng",
      icon: ClipboardList,
      perm: "qc.create",
    },
    {
      href: "/inventory",
      label: "Tồn kho",
      icon: Package,
      perm: "inventory.manage",
    },
    {
      href: "/storage-locations",
      label: "Vị trí kho",
      icon: MapPinHouse,
      perm: "inventory.manage",
    },
    {
      href: "/export-orders",
      label: "Đơn xuất khẩu",
      icon: SquareKanban,
      perm: "order.create",
    },
    {
      href: "/reports",
      label: "Báo cáo",
      icon: BarChart2,
      perm: "reports.view",
    },
    {
      href: "/shipments",
      label: "Vận chuyển",
      icon: Truck,
      perm: "shipment.manage",
    },
  ];

  return (
    <aside
      className={cn(
        "h-full w-72 border-r bg-white flex flex-col",
        mobile && "w-full"
      )}
    >
      <div className="px-4 py-4 border-b font-semibold text-xl flex space-x-2">
        <Shrimp />
        <span>Seafood Management</span>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-2">
        {links.map((item) => {
          if (item.perm && !can(item.perm)) return null;

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
