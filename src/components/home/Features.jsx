

import { FaCalendarAlt, FaUsers, FaRegSmile, FaCheckCircle, FaStar } from "react-icons/fa";

const features = [
  {
    icon: <FaCalendarAlt className="text-[#8fda20] text-4xl mb-4 mx-auto" />,
    title: "Plan Your Event",
    description: "Easily schedule and organize any type of event, from weddings to corporate meetings, all in one place.",
  },
  {
    icon: <FaUsers className="text-[#8fda20] text-4xl mb-4 mx-auto" />,
    title: "Manage Attendees",
    description: "Keep track of your guests, send invitations, and manage RSVPs seamlessly.",
  },
  {
    icon: <FaRegSmile className="text-[#8fda20] text-4xl mb-4 mx-auto" />,
    title: "Engage Your Guests",
    description: "Add interactive elements, surveys, or polls to make your event memorable for everyone.",
  },
  {
    icon: <FaCheckCircle className="text-[#8fda20] text-4xl mb-4 mx-auto" />,
    title: "Confirm Success",
    description: "Monitor tasks and vendor coordination to ensure your event runs smoothly from start to finish.",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3 flex-wrap sm:flex-nowrap">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Features of
          </h2>
          <h2 className="text-[#8fda20] dark:text-[#ADFF30] text-3xl sm:text-4xl md:text-5xl font-bold">Eventoria</h2>
          <FaStar className="text-[#8fda20] text-3xl md:text-4xl" />
        </div>


        <p className="text-muted-foreground text-sm md:text-lg mt-2">
          Discover how Eventoria helps you plan, manage, and deliver amazing events effortlessly.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-black border-4 border-[#ADFF30] p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform"
          >
            {feature.icon}
            <h3 className="text-xl md:text-2xl font-semibold text-[#8fda20] dark:text-[#ADFF30] mb-2">{feature.title}</h3>
            <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
