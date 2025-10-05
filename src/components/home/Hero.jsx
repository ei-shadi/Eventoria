import Link from "next/link";
import Banner from "../../../public/images/Banner.jpg";
import Button from "../shared/Button";
import HeroAnimation from "../shared/HeroAnimation";


const Hero = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${Banner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-full h-screen flex items-center justify-center text-white"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Hero Animation */}
        <div className="absolute top-45 lg:top-48 xl:top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

          <HeroAnimation />
        </div>

        {/* Headline */}
        <h1 className="max-[400px]:text-3xl text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight pt-76 lg:pt-[350px] xl:pt-[380px]">
          Host Events That Inspire,<br /> Plan. Host. Celebrate — All in One Place.
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-sm md:text-lg max-w-4xl lg:text-xl text-gray-300 mx-auto">
          From concerts to corporate meetups, Eventoria helps you create, manage, and track every event effortlessly.
        </p>

        {/* Buttons */}
        <div className="mt-4 md:mt-8 flex flex-col sm:flex-row gap-4 px-10 md:px-0 justify-center">
          <Button
            label="Create Your Event"
            bgColor="#ADFF30"
            textColor="black"
            hoverBg="black"
            hoverText="white"
            hoverBorder="#ADFF30"
            borderColor="black"
          />
          <Link href="/events">
            <button className="border-2 border-white text-white hover:bg-white hover:text-black text-lg font-extrabold px-10 py-3 rounded-full transition cursor-pointer">
              Explore Events
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
