"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="py-5 w-[90%] md:w-[80%] mx-auto">
      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Company" title="Company" className="inline-flex items-center">
            <Image src={Logo} alt="logo" className="w-18 md:w-20"/>
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800">
            Eventoria
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="items-center hidden space-x-8 xl:space-x-18 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                aria-label={link.name}
                title={link.name}
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Sign Up */}
        <ul className="items-center hidden space-x-8 lg:flex">
          <li>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
              <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
              <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
            </svg>
          </button>

          {/* Full-screen Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-8">
              {/* Close Button */}
              <button
                aria-label="Close Menu"
                title="Close Menu"
                className="absolute top-6 right-6 p-2 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3-6.3,6.3
                    c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3 6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,
                    0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                  />
                </svg>
              </button>

              {/* Menu Items */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-2xl font-bold text-gray-700 hover:text-deep-purple-accent-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Sign Up Button */}
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
