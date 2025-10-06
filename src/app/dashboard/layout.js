"use client";

import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../../../public/images/Logo.png";
import Link from "next/link";


export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-gray-100 dark:bg-gray-800 ">
      {/* Sidebar */}
      

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    

      {/* Main Content */}
      <div className="flex-1 flex w-9/12 flex-col min-h-screen">
        {/* Mobile Navbar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3 
                        bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700"
        >
          <Link 
          href="/"
          aria-label="Company"
          title="Company"
          className="text-lg font-bold text-gray-700 dark:text-gray-200 font-gabriela flex items-center gap-2 ">
             <Image src={Logo} alt="logo" className="w-10 md:w-12" />  <p className="text-xl">Eventoria</p>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-800 dark:text-gray-200 text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* Page Content */}
        <main className="max-h-screen  flex-1 p-4 text-gray-900 dark:text-gray-100 overflow-y-auto font-gabriela">
          {children}
        </main>
      </div>
    </div>
  );
}
