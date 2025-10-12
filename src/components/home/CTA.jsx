"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/Event.png"; 
import Button from "../shared/Button";

const CTA = () => {
  return (
    <section
      className="bg-black dark:bg-white dark:text-black border-[#ADFF30] border-4 text-white py-10 text-center rounded-3xl shadow-2xl overflow-hidden w-[90%] md:w-[85%] 2xl:w-8xl mx-auto">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 z-10">
        {/* Logo */}
        <Image
          src={Logo}
          alt="Eventoria Logo"
          className="object-contain drop-shadow-md w-[150px] h-[150px]"
        />

        {/* Icon + Heading in one row */}
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Ready to Make Your <span className="text-[#ADFF30] dark:text-[#8fda20]">Event Unforgettable</span>?
          </h2>

        {/* Subtext */}
        <p className="text-lg text-gray-400 dark:text-gray-500 max-w-xl mt-2">
          Eventoria helps you plan, manage, and celebrate your events with ease.  
          From weddings to corporate gatherings — we handle everything.
        </p>

        {/* CTA Button */}
        <Link href="/events" className="mt-2 md:mt-4">
          <Button
            label="Plan Your Event Now..."
            bgColor="#ADFF30"
            textColor="black"
            hoverBg="black"
            hoverText="white"
            hoverBorder="#ADFF30"
            borderColor="black"/>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
