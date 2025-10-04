"use client";

import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: <FaFacebook className="h-5 w-5" /> },
  { href: "https://instagram.com", label: "Instagram", icon: <FaInstagram className="h-5 w-5" /> },
  { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter className="h-5 w-5" /> },
];

const SocialLinks = () => {
  return (
    <div className="flex items-center mt-4 space-x-4 sm:mt-0">
      {socialLinks.map((social, idx) => (
        <Link
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="text-gray-400 hover:text-[#8fda20] transition-colors duration-300 hover:scale-130 ease-in-out"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
