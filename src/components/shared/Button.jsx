"use client";
import React from "react";

const Button = ({ label = "Click Me", onclick }) => {
  return (
    <button
      className="px-6 xl:px-10 py-2.5 rounded-full border-2 border-[#ADFF30] hover:border-black text-[#ADFF30] transition-all duration-200 ease-in-out bg-black hover:bg-[#ADFF30] hover:text-gray-900 hover:rounded-bl-2xl hover:rounded-rl-2xl text-xl font-extrabold cursor-pointer"
      onClick={onclick}
    >
      {label}
    </button>
  );
};

export default Button;
