import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Handshake,
  PartyPopper,
} from "lucide-react";

const Contact = () => {
  return (
    <section className="pt-[120px] md:pt-[150px] pb-24 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 lg:mb-28">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="text-[#adff30]">Eventoria</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Have any questions, partnership ideas, or need help with an event?
            <br className="hidden sm:block" /> Our team is here to assist you
            24/7.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start pb-12 md:pb-16 lg:pb-24">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base md:text-lg">
              Whether you’re planning an event, looking for collaboration, or
              just have a general inquiry — feel free to reach out to our
              friendly support team. We usually reply within 24 hours!
            </p>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#adff30] rounded-full shrink-0">
                <Phone className="text-black" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  +880 1234-567890
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#adff30] rounded-full shrink-0">
                <Mail className="text-black" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  support@eventoria.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#adff30] rounded-full shrink-0">
                <MapPin className="text-black" size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Office Address</h4>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  12/A, Gulshan Avenue, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
              Send us a Message
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-base">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#adff30]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-base">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#adff30]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-base">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#adff30]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#adff30] text-black font-semibold py-3 rounded-md hover:bg-[#d6ff5e] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Indicator Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 md:mb-20 lg:mb-24">
          {/* Left Side Banner */}
          <div className="bg-gradient-to-r from-[#adff30]/20 to-transparent dark:from-[#adff30]/10 p-8 rounded-2xl shadow-lg border border-[#adff30]/30 h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-[#adff30]" size={28} />
              <h3 className="text-2xl sm:text-3xl font-semibold text-black dark:text-[#adff30]">
                Our Location
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-2">
              Eventoria proudly operates across the entire{" "}
              <span className="font-semibold text-black dark:text-[#adff30]">Bangladesh</span>.
              From Dhaka to Chittagong, Sylhet to Khulna — our event experts are
              ready to assist you wherever you are! 🇧🇩
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              Visit our head office or explore our partner hubs nationwide.Join us Now!
            </p>
          </div>

          {/* Right Side Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#adff30]/40 h-[400px] lg:h-[450px]">
            <iframe
              title="Bangladesh Map"
              src="https://www.google.com/maps?q=Bangladesh&z=6&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-r from-[#adff30]/20 to-transparent p-6 sm:p-8 rounded-2xl shadow-lg border border-[#adff30]/30">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-3">
            <Handshake className="dark:text-[#adff30] text-black" size={24} />
            <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-[#adff30] tracking-wide">
              Partner With Eventoria
            </h3>
            <Sparkles className="text-black dark:text-[#adff30]" size={24} />
          </div>

          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed">
            Looking for{" "}
            <span className="font-semibold text-black dark:text-[#adff30]">event sponsorships</span>{" "}
            or{" "}
            <span className="font-semibold text-black dark:text-[#adff30]">collaboration opportunities</span>
            ? <br />
            <span className="inline-flex flex-wrap justify-center items-center gap-2 mt-2">
              <Mail size={18} className="text-black dark:text-[#adff30]" /> Drop
              us an email — we’re always open to{" "}
              <span className="font-medium text-black dark:text-[#adff30]">creative ideas</span>{" "}
              that make every event{" "}
              <span className="font-semibold">unforgettable</span>!{" "}
              <PartyPopper className="text-[#adff30]" size={20} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
