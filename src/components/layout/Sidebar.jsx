"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaTicketAlt,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import {
  MdEvent,
  MdEventAvailable,
  MdEventNote,
  MdReviews,
} from "react-icons/md";
import Logo from "../../../public/images/Logo.png";
import Image from "next/image";


export default function Sidebar({ isOpen, setIsOpen }) {
  const role = "organizer"; // later dynamic
  const pathname = usePathname();

  let sidebarRoutes = [];

  if (role === "admin") {
    sidebarRoutes = [
      { name: "Dashboard Overview", path: "/dashboard/admin-dashboard", icon: <FaHome /> },
      { name: "Event Management", path: "/dashboard/events-management", icon: <MdEvent /> },
      { name: "Organizer Management", path: "/dashboard/organizers", icon: <MdEventAvailable /> },
      { name: "User Management", path: "/dashboard/users", icon: <FaUsers /> },
      { name: "Total Sales & Reports", path: "/dashboard/total-reports", icon: <FaTicketAlt /> },
      { name: "Profile Settings", path: "/dashboard/profile-settings", icon: <FaCog /> },
      { name: "Logout", path: "/logout", icon: <FaSignOutAlt />, bottom: true },
    ];
  }

  if (role === "organizer") {
    sidebarRoutes = [
      { name: "Dashboard Overview", path: "/organizer-dashboard", icon: <FaHome /> },
      { name: "Add Event", path: "/dashboard/add-event", icon: <MdEventNote /> },
      { name: "My Events", path: "/dashboard/my-events", icon: <MdEvent /> },
      { name: "Ticket Management", path: "/dashboard/tickets-management", icon: <FaTicketAlt /> },
      { name: "Ticket Sales & Reports", path: "/dashboard/my-reports", icon: <FaTicketAlt /> },
      { name: "Event Calendar", path: "/dashboard/event-calendar", icon: <FaCalendarAlt /> },
      { name: "Attendee Management", path: "/dashboard/attendees", icon: <FaUsers /> },
      { name: "Reviews & Ratings", path: "/dashboard/reviews", icon: <MdReviews /> },
      { name: "Profile Settings", path: "/dashboard/profile-settings", icon: <FaCog /> },
      { name: "Logout", path: "/logout", icon: <FaSignOutAlt />, bottom: true },
    ];
  }

  if (role === "user") {
    sidebarRoutes = [
      { name: "Dashboard Overview", path: "/user-dashboard", icon: <FaHome /> },
      { name: "Event Discovery", path: "/dashboard/discovery", icon: <MdEventAvailable /> },
      { name: "Ticket Management", path: "/dashboard/my-tickets", icon: <FaTicketAlt /> },
      { name: "Reviews & Ratings", path: "/dashboard/my-reviews", icon: <MdReviews /> },
      { name: "Event Calendar", path: "/dashboard/my-calendar", icon: <FaCalendarAlt /> },
      { name: "Profile Settings", path: "/dashboard/profile-settings", icon: <FaCog /> },
      { name: "Notifications", path: "/dashboard/notifications", icon: <MdEventNote /> },
      { name: "Logout", path: "/logout", icon: <FaSignOutAlt />, bottom: true },
    ];
  }


  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 w-64 h-full z-50 font-gabriela
        bg-white dark:bg-gray-900 
        text-gray-800 dark:text-gray-200 
        shadow-lg border-r dark:border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
         <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md lg:hidden fixed w-full z-50 top-0">
          
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col min-h-screen p-4 gap-2 justify-between">
          <Link
          href="/"
          aria-label="Company"
          title="Company"
          className="lg:inline-flex items-center hidden "
        >
          <Image src={Logo} alt="logo" className="w-12 md:w-15" />
          <h3 className="ml-2 text-xl md:text-2xl font-bold tracking-wide text-gray-800 dark:text-gray-100 font-gabriela">
            Eventoria
          </h3>
        </Link>
          {/* Top Links */}
          <div className="flex flex-col gap-2">
            {sidebarRoutes.filter(r => !r.bottom).map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.name}
                  href={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500 dark:bg-blue-600 text-white shadow"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      isActive ? "text-white" : "text-blue-500 dark:text-blue-400"
                    }`}
                  >
                    {route.icon}
                  </span>
                  {route.name}
                </Link>
              );
            })}
          </div>

          {/* Bottom Links (Logout) */}
          <div className="mt-4 lg:mt-auto">
            {sidebarRoutes.filter(r => r.bottom).map((route) => (
              <Link
                key={route.name}
                href={route.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md 
                  text-red-600 dark:text-red-400 
                  hover:bg-red-100 dark:hover:bg-red-800/40"
              >
                <span className="text-lg">{route.icon}</span>
                {route.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
