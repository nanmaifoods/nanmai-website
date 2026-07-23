"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    image: "/images/photos/image1.png",
    mobileImage: "/images/photos/image2.png",
    alt: "Nanmai Appalam - Crispy Goodness, Authentic Taste",
    heading: ["Crispy Goodness", "Authentic Taste"],
    paragraph:
      "Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.",
  },
  {
    image: "/images/new_image/header2.png",
    mobileImage: "/images/new_image/header4.jpeg",
    alt: "Nanmai Punjabi Pappad - Taste the Tradition, Love Every Bite",
    heading: ["Taste the Tradition", "Love Every Bite"],
    paragraph: "Bringing timeless recipes and unforgettable dining experiences.",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop / tablet hero */}
      <div className="relative hidden sm:block w-full aspect-[1759/715]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[active].image}
              alt={SLIDES[active].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 md:gap-3 px-4 -translate-y-[10%]">
              <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="font-serif leading-[1.15] text-brand-dark text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {SLIDES[active].heading[0]}
                <br />
                {SLIDES[active].heading[1]}
              </h1>
              <p className="max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl text-gray-600 text-[11px] sm:text-sm md:text-base lg:text-lg">
                {SLIDES[active].paragraph}
              </p>
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-2 md:mt-4">
                <div className="animate-float">
                  <Link
                    href="/products"
                    className="btn-primary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="animate-float [animation-delay:0.5s]">
                  <Link
                    href="/about"
                    className="btn-secondary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 bg-white/70 backdrop-blur-sm"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-brand-pink" : "w-2 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile hero */}
      <div className="relative block sm:hidden w-full aspect-[779/1120]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[active].mobileImage}
              alt={SLIDES[active].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 top-[4%] flex flex-col items-center text-center gap-2 px-4">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="font-serif leading-[1.15] text-brand-dark text-2xl">
                {SLIDES[active].heading[0]}
                <br />
                {SLIDES[active].heading[1]}
              </h1>
              <p className="max-w-[85%] text-gray-600 text-sm">
                {SLIDES[active].paragraph}
              </p>
              <div className="flex items-center justify-center gap-3 mt-1.5">
                <div className="animate-float">
                  <Link
                    href="/products"
                    className="btn-primary text-sm px-5 py-2.5 gap-1.5"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="animate-float [animation-delay:0.5s]">
                  <Link
                    href="/about"
                    className="btn-secondary text-sm px-5 py-2.5 gap-1.5 bg-white/70 backdrop-blur-sm"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-brand-pink" : "w-1.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
