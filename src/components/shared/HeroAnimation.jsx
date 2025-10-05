"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/animations/Hero Animation.json";

const HeroAnimation = () => {
  return (
    <div className="w-90 md:w-[450px] lg:w-[480px] xl:w-[550px]">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default HeroAnimation;
