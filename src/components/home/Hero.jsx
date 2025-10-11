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
        <div className="absolute top-[25%] md:top-[23%] lg:top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">

          <HeroAnimation />
        </div>

        {/* Headline */}
        <h1 className="max-[400px]:text-3xl text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight pt-72 lg:pt-[350px] xl:pt-[380px]">
          Host <span className="text-[#ADFF30]">Events</span> That Inspire,<br /> <span className="text-[#ADFF30]">Plan</span>, <span className="text-[#ADFF30]">Host</span>, <span className="text-[#ADFF30]">Celebrate</span> — All in <span className="text-[#ADFF30]">One</span> Place.
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-sm md:text-lg max-w-4xl lg:text-xl text-gray-300 mx-auto">
          From concerts to corporate meetups, Eventoria helps you create, manage, and track every event effortlessly.
        </p>

        {/* Buttons */}
        <Link href="/events" className="mt-4 md:mt-8">
          <Button
            label="Explore Events"
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

export default Hero;
