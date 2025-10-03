"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Navbar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 
                        bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700"
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-800 dark:text-gray-200 text-xl"
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
            Dashboard
          </h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 text-gray-900 dark:text-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
