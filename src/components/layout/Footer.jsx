import Link from "next/link";
import SocialLinks from "../shared/SocialLinks";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";

const footerLinks = [
  {
    title: "Events",
    links: ["Upcoming Events", "Past Events", "Featured Events", "Workshops"],
  },
  {
    title: "Services",
    links: ["Event Planning", "Ticket Booking", "Venue Management", "Promotions"],
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "FAQs", "Help Center"],
  },
  {
    title: "Company",
    links: ["About Us", "Contact", "Careers", "Privacy Policy"],
  },
];


const Footer = () => {
  return (
    <footer className="bg-black dark:bg-gray-800 dark:text-gray-700 text-gray-300">
      <div className="pt-16 w-[90%] xl:w-[80%] mx-auto">
        
        {/* Logo + Name at Top */}
        <div className="text-left">
          <Link href="/" className="inline-flex items-center">
            <Image src={Logo} alt="logo" className="w-18" />
            <h3 className="ml-2 text-2xl md:text-3xl font-bold tracking-wide text-gray-100 font-gabriela">
              Eventoria
            </h3>
          </Link>
        </div>

        {/* Description + Footer Links in SAME grid */}
        <div className="mt-6 grid gap-10 lg:grid-cols-5">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-[#8fda20] text-lg font-gabriela">Eventoria</span> is your all-in-one event management system designed to
              create, organize, and manage events effortlessly. From planning to
              ticket booking, everything is in one place. Whether you’re hosting
              conferences, concerts, or community meetups, Eventoria helps
              streamline your workflow and deliver memorable experiences.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-5 md:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <p className="font-semibold tracking-wide font-gabriela text-[#8fda20] text-lg xl:text-xl">
                  {section.title}
                </p>
                <ul className="mt-2 space-y-2">
                  {section.links.map((item) => (
                    <li key={item}>
                      <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-5 pb-10 border-t border-[#8fda20] sm:flex-row mt-10">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved by{" "}
            <span className="font-bold text-[#8fda20] font-gabriela">Eventoria</span>
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
