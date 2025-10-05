"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/Logo.png";
import { ModeToggle } from "../ui/ToggleButton";
import Button from "../shared/Button";
import { useSession, signOut } from "next-auth/react";

// ✅ React Icons (Font Awesome)
import {
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Events", path: "/events", icon: FaCalendarAlt },
    { name: "About Us", path: "/about", icon: FaInfoCircle },
    { name: "Contact", path: "/contact", icon: FaPhoneAlt },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, mounted]);

  const navbarBgClass = isScrolled
    ? "bg-black/50 dark:bg-black/30 backdrop-blur-md"
    : "bg-transparent";

  return (
    <nav>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navbarBgClass}`}
      >
        <div className="py-5 px-6 md:px-14 lg:px-10 container mx-auto">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center">
              <Image src={Logo} alt="logo" className="w-18" />
              <h3 className="ml-2 text-2xl md:text-3xl font-bold tracking-wide text-white dark:text-white font-gabriela">
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
                        : "text-gray-400 dark:text-gray-400 xl:text-lg font-semibold hover:text-[#ADFF30] dark:hover:text-[#738E54]"
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
                      <AvatarFallback>
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 flex flex-col justify-between items-center gap-2">
                    <DropdownMenuItem className="cursor-not-allowed font-gabriela text-lg text-black dark:text-white">
                      {session.user.name || session.user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-fit text-center px-8 py-1 border-[#8fda20] border-4 font-bold text-base text-[#8fda20] rounded-full bg-black dark:hover:bg-white dark:hover:text-black cursor-pointer">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-lg px-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition my-2 font-semibold cursor-pointer"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
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
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setIsMenuOpen(true)}
              >
                <FaBars className="w-7 h-7 text-gray-800 dark:text-gray-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal-based Mobile Menu */}
      {mounted &&
        isMenuOpen &&
        createPortal(
          <MobileMenuPortal
            navLinks={navLinks}
            session={session}
            pathname={pathname}
            onClose={() => setIsMenuOpen(false)}
            onSignOut={() => {
              setIsMenuOpen(false);
              signOut({ callbackUrl: "/" });
            }}
          />,
          document.body
        )}
    </nav>
  );
};

function MobileMenuPortal({ navLinks, session, pathname, onClose, onSignOut }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col py-6 px-6 gap-24">
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
            onClick={onClose}
          >
            <FaTimes className="w-7 h-7 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      </div>

      {/* Links + Dashboard + Logout */}
      <div className="flex flex-col items-center gap-6 mt-6 w-full">
        {[...navLinks, ...(session ? [{ name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt }] : [])].map(
          (link) => {
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
                onClick={onClose}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          }
        )}

        {session ? (
          <button
            onClick={onSignOut}
            className="w-[300px] text-xl text-center px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition font-gabriela font-extrabold"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" onClick={onClose}>
            <Button
              label="Sign Up"
              className="w-full"
              bgColor="#DC2626"
              textColor="white"
              borderColor="black"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
