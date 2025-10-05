"use client";
import React, { useState } from "react";

const Button = ({
  label = "Click Me",
  onClick,
  bgColor = "black",
  textColor = "#ADFF30",
  borderColor = "#ADFF30",
  hoverBg = "#ADFF30",
  hoverText = "black",
  hoverBorder = "black",
}) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`px-10 lg:px-6 xl:px-10 py-3 rounded-full border-4 font-extrabold text-xl cursor-pointer transition-all  ease-in-out`}
      style={{
        color: hover ? hoverText : textColor,
        backgroundColor: hover ? hoverBg : bgColor,
        borderColor: hover ? hoverBorder : borderColor,
        borderRadius: hover ? "1.5rem 1.5rem 1.5rem 0rem" : "9999px",
      }}
    >
      {label}
    </button>
  );
};

export default Button;
