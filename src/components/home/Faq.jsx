"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaQuestion } from "react-icons/fa";

export default function Faq() {
  const faqs = [
    {
      question: "What types of events does Eventoria manage?",
      answer:
        "We organize all kinds of events — weddings, corporate meetings, product launches, concerts, festivals, and private parties. Our team tailors each event to match your vision and audience.",
    },
    {
      question: "Can I plan my event completely online?",
      answer:
        "Yes. You can book venues, choose services, and manage your entire event online through Eventoria. Our team coordinates every detail digitally while keeping you updated.",
    },
    {
      question: "Do you offer custom event packages?",
      answer:
        "Absolutely. Every event is unique, so we let you pick and customize services like decoration, catering, photography, and entertainment based on your preferences and budget.",
    },
    {
      question: "How far in advance should I book my event?",
      answer:
        "We recommend booking at least 4–6 weeks before your event date for the best availability. However, we also handle urgent or last-minute bookings whenever possible.",
    },
    {
      question: "Can Eventoria help promote my event?",
      answer:
        "Yes, we provide complete event marketing support — from social media promotion and ticketing setup to influencer collaborations and press coverage.",
    },
    {
      question: "Do you manage vendors and suppliers?",
      answer:
        "Yes. We handle all vendor coordination including catering, decoration, lighting, audio, and logistics so you can focus on enjoying your event.",
    },
    {
      question: "Is there on-site support during the event?",
      answer:
        "Definitely. Our team is present on-site to manage guests, handle coordination, and solve any last-minute issues for a smooth event experience.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept online payments through credit/debit cards, mobile banking, and digital wallets. You can also pay in installments for larger events.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3 flex-wrap sm:flex-nowrap">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Frequently Asked{" "}
          </h2>
          <h2 className="text-[#8fda20] dark:text-[#ADFF30] text-3xl sm:text-4xl md:text-5xl font-bold">Questions</h2>
          <FaQuestion className="text-[#8fda20] text-3xl md:text-4xl shrink-0" />
        </div>

        <p className="text-muted-foreground text-sm md:text-lg mt-2">
          Everything you need to know about planning and managing your event with Eventoria.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-3 md:px-14 xl:px-0"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-xl md:text-2xl font-semibold text-[#8fda20]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg font-medium">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
