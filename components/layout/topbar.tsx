"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useLogout } from "@/hooks/auth/logout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/auth/profile";

export default function Topbar() {
  const logoutMutation = useLogout();
  const router = useRouter();
  const { data: userData } = useProfile();

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      router.push("/login");
    }
  }, [logoutMutation.isSuccess, router]);

  return (
    <header className="h-14 border-b bg-white flex items-center px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        <h1 className="font-semibold text-lg"></h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Right section */}
        <div className="text-sm text-gray-600">
          Xin chào, {userData?.user.fullName}
        </div>
        <button
          className="text-sm text-gray-50 bg-red-600 py-1 px-2 rounded-md cursor-pointer hover:bg-red-700 transition"
          onClick={() => logoutMutation.mutate()}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
