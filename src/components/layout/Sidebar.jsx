"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Sidebar({ role = "organizer" }) {
  const pathname = usePathname();

  // Sidebar routes with role access
  const sidebarRoutes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
      roles: ["admin", "organizer", "user"],
    },
    {
      name: "Admin Panel",
      path: "/dashboard/admin",
      icon: <MdAdminPanelSettings />,
      roles: ["admin"],
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
      roles: ["admin", "organizer"],
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog />,
      roles: ["admin", "organizer", "user"],
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt />,
      roles: ["admin", "organizer", "user"],
      bottom: true,
    },
  ];

  return (
    <Sheet>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen p-4 bg-gray-100 border-r">
        <div className="text-2xl font-bold mb-8">Admin</div>

        <nav className="flex flex-col flex-1 gap-2">
          {/* Top Links */}
          {sidebarRoutes
            .filter((route) => !route.bottom && route.roles.includes(role))
            .map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.name}
                  href={route.path}
                  className={`flex items-center gap-2 p-2 rounded ${
                    isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                  }`}
                >
                  {route.icon} {route.name}
                </Link>
              );
            })}

          {/* Bottom Links */}
          <div className="mt-auto">
            {sidebarRoutes
              .filter((route) => route.bottom && route.roles.includes(role))
              .map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                >
                  {route.icon} {route.name}
                </Link>
              ))}
          </div>
        </nav>
      </div>

      {/* Mobile Trigger */}
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <FaBars size={20} />
        </Button>
      </SheetTrigger>

      {/* Mobile Sidebar Content */}
      <SheetContent side="left" className="p-4 w-64">
        <div className="text-2xl font-bold mb-6">Admin</div>
        <nav className="flex flex-col space-y-3">
          {sidebarRoutes
            .filter((route) => route.roles.includes(role))
            .map((route) => (
              <Link
                key={route.name}
                href={route.path}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
              >
                {route.icon} {route.name}
              </Link>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
