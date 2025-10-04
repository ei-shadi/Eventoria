"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/Logo.png";
import { ModeToggle } from "../ui/ToggleButton";
import Button from "../shared/Button";
import { useSession, signOut } from "next-auth/react";
import { Home, CalendarDays, Info, Phone, LayoutDashboard } from "lucide-react";

// ShadCN UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Events", path: "/events", icon: CalendarDays },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="py-5 w-[90%] xl:w-[80%] mx-auto">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <Image src={Logo} alt="logo" className="w-18 md:w-20" />
            <h3 className="ml-2 text-2xl md:text-3xl font-bold tracking-wide text-gray-800 dark:text-gray-100 font-gabriela">
              Eventoria
            </h3>
          </Link>

          {/* Desktop Menu */}
          <ul className="items-center hidden space-x-8 xl:space-x-12 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-2 transition-colors ${
                    pathname === link.path
                      ? "font-bold text-headline text-xl xl:text-2xl"
                      : "text-gray-700 dark:text-gray-400 xl:text-lg font-semibold hover:text-[#738E54] dark:hover:text-[#738E54]"
                  }`}
                >
                  <link.icon className="w-6 h-6" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-14 h-14 cursor-pointer hover:ring-4 ring-[#8fda20]">
                    <AvatarImage
                      src={
                        session.user.image ||
                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                      }
                    />
                    <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem className="cursor-default">
                    {session.user.name || session.user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button label="Sign Up" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col py-6 px-6 gap-24 transition-colors backdrop-blur-md">
                {/* Top Header: Avatar + Name + Toggle + Close */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={
                          session?.user.image ||
                          "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                        }
                      />
                      <AvatarFallback>{session?.user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    {session && (
                      <p className="font-bold max-[400px]:text-base font-gabriela text-gray-800 dark:text-[#8fda20] text-lg overflow-hidden text-ellipsis">
                        {session.user.name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <ModeToggle />
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-300"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3
                          c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,
                          0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Links + Dashboard + Logout */}
                <div className="flex flex-col items-center gap-6 mt-6 w-full">
                  {[...navLinks, ...(session ? [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }] : [])].map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`flex items-center gap-2 justify-center w-fit px-6 py-2 font-bold text-xl rounded-full transition ${
                          isActive
                            ? "bg-black text-[#8fda20] border-4 border-[#8fda20]"
                            : "text-gray-700 dark:text-gray-400 hover:text-[#738E54] dark:hover:text-[#738E54]"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    );
                  })}

                  {session ? (
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-[300px] text-xl text-center px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link href="/login" className="w-3/4">
                      <Button label="Sign Up" className="w-full" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
