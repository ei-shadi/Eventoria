"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegCommentDots } from "react-icons/fa";

const reviews = [
  { name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1", rating: 5, comment: "Amazing service! Eventoria made my wedding unforgettable." },
  { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=2", rating: 4.5, comment: "Professional and attentive. Everything went smoothly." },
  { name: "Mark Wilson", avatar: "https://i.pravatar.cc/100?img=3", rating: 4, comment: "Great team! Highly recommended for corporate events." },
  { name: "Alice Brown", avatar: "https://i.pravatar.cc/100?img=4", rating: 5, comment: "Outstanding experience. Very creative and organized." },
  { name: "Michael Lee", avatar: "https://i.pravatar.cc/100?img=5", rating: 4.5, comment: "Friendly staff and amazing execution for our product launch." },
];

const ReviewCard = React.memo(({ review }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++)
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    if (hasHalfStar)
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    while (stars.length < 5)
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />);
    return stars;
  };

  return (
    <motion.div
      className="relative w-72 sm:w-80 md:w-96 flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-gradient-to-t from-[#8fda20] to-black text-white px-10 py-14 select-none"
      whileHover={{ scale: 1.05, y: -8, transition: { type: "spring", stiffness: 300 } }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={review.avatar}
          alt={review.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full border-2 border-white object-cover"
        />
        <div>
          <h3 className="text-lg sm:text-xl font-bold">{review.name}</h3>
          <div className="flex items-center">{renderStars()}</div>
        </div>
      </div>
      <p className="italic text-sm sm:text-base leading-relaxed">"{review.comment}"</p>
    </motion.div>
  );
});

export default function ClientReviewCarousel() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const animationControls = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidths = () => {
      if (!containerRef.current || !trackRef.current) return;
      const firstCard = trackRef.current.querySelector("div");
      if (firstCard) setCardWidth(firstCard.offsetWidth + 24);
    };
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, []);

  const startAutoScroll = () => {
    if (!cardWidth) return;
    const totalWidth = cardWidth * reviews.length;
    if (animationControls.current) animationControls.current.stop();

    animationControls.current = animate(x, -totalWidth, {
      duration: totalWidth / 50,
      ease: "linear",
      onComplete: () => {
        x.set(0);
        startAutoScroll();
      },
    });
  };

  useEffect(() => {
    startAutoScroll();
    return () => animationControls.current?.stop();
  }, [cardWidth]);

  return (
    <section className="w-full flex flex-col items-center relative">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10 max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            What <span className="text-[#8fda20] dark:text-[#ADFF30] px-2">Our Clients</span> Say
          </h2>
          <FaRegCommentDots className="text-[#8fda20] text-3xl md:text-4xl" />
        </div>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg ">
          Hear directly from our clients about their experience working with Eventoria. 
          Their feedback inspires us to keep delivering excellence every day.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Section-side fade overlays */}
        <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />

        <motion.div
          ref={containerRef}
          className="w-full overflow-x-hidden"
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 py-6 px-2 sm:px-4 items-center"
            style={{ x }}
          >
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
            {/* clone for seamless scroll */}
            {reviews.map((review, index) => (
              <ReviewCard key={`clone-${index}`} review={review} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
