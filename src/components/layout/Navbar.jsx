"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../../public/images/Logo.png";
import { ModeToggle } from "../ui/ToggleButton";
import Button from "../shared/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="py-5 w-[90%] xl:w-[80%] mx-auto">
      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
          <Image src={Logo} alt="logo" className="w-18 md:w-20" />
          <h3 className="ml-2 text-2xl md:text-3xl font-bold tracking-wide text-gray-800 dark:text-gray-100 font-gabriela">
            Eventoria
          </h3>
        </Link>

        {/* Desktop Menu */}
        <ul className="items-center hidden space-x-8 xl:space-x-18 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                aria-label={link.name}
                title={link.name}
                className={`tracking-wide transition-colors duration-200 
                  ${pathname === link.path
                    ? "font-bold text-headline text-2xl"
                    : "text-gray-700 dark:text-gray-400 xl:text-lg font-semibold hover:text-[#738E54]"
                  }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side: Sign Up + Dark Mode Toggle */}
        <div className="items-center hidden space-x-8 lg:flex">
          <ModeToggle />
          <Link href="/login">
            <Button label="Sign Up" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100 dark:hover:bg-gray-700"
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
            <div className="fixed inset-0 z-50 bg-white dark:bg-black flex flex-col gap-40 transition-colors">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center w-full px-6">
                {/* Logo + Name */}
                <Link
                  href="/"
                  className="inline-flex items-center mt-10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image src={Logo} alt="logo" className="w-18 md:w-20" />
                  <h3 className="ml-2 text-2xl md:text-3xl font-bold tracking-wide text-gray-800 dark:text-gray-100 font-gabriela">
                    Eventoria
                  </h3>
                </Link>

                {/* Close Button */}
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:shadow-outline mt-10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3
                      c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,
                      0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                    />
                  </svg>
                </button>
              </div>

              {/* Centered Menu Items */}
              <div className="flex flex-col items-center justify-center  space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`font-bold transition-colors duration-200 ${pathname === link.path
                      ? "text-[#8fda20] text-2xl"
                      : "text-gray-700 dark:text-gray-400 hover:text-[#738E54] text-xl"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Dark Mode Toggle */}
                <ModeToggle />

                {/* Sign Up Button */}
                <Link
                  href="/login"
                  aria-label="Sign up"
                  title="Sign up"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button label="Sign Up" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
