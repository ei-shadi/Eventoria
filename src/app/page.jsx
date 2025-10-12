import ClientsReview from "@/components/home/ClientsReview";
import CTA from "@/components/home/CTA";
import Faq from "@/components/home/Faq";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import UpcomingEvents from "@/components/home/UpcomingEvents";


const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-[100px]">
        <Features />
      </section>
      
      {/* Upcoming Events Section */}
      <section className="py-16 lg:py-[100px]">
        <UpcomingEvents />
      </section>
      
      {/* Clients Reviews Section */}
      <section className="py-16 lg:py-[100px]">
        <ClientsReview />
      </section>
      
      {/* Faq Section */}
      <section className="py-16 lg:py-[100px]">
        <Faq />
      </section>
      
      {/* CTA Section */}
      <section className="py-16 lg:py-[100px]">
        <CTA />
      </section>
    </>
  );
};

export default Home;