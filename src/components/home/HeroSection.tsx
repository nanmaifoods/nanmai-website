"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/new_assets/slider1.png",
    alt: "Nanmai Appalam - Traditional South Indian Papad",
    tagline: "Crispy, Tasty and Chennai Special",
  },
  {
    src: "/images/new_assets/slider2.png",
    alt: "Nanmai Appalam - Crispy and Delicious",
    tagline: "Taste Home Where Ever You Are",
  },
  {
    src: "/images/new_assets/slider3.png",
    alt: "Nanmai Appalam - Premium Quality",
    tagline: "Crispy Goodness, Authentic Taste",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [prevSlide, setPrevSlide] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const goToSlide = (index: number) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };

  const direction = currentSlide > prevSlide ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[80vh] lg:h-[85vh]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                fill
                className="object-cover object-center"
                priority={currentSlide === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 flex items-center justify-start pointer-events-none px-3 sm:px-5 md:px-6 lg:px-12 xl:px-16">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/images/logo.svg"
                    alt="Nanmai Logo"
                    width={120}
                    height={48}
                    className="w-9 sm:w-12 md:w-16 lg:w-24 xl:w-28 h-auto mb-1 md:mb-2 pointer-events-auto"
                  />
                  <h1
                    style={{
                      fontFamily: "'Montserrat', 'Arial Black', sans-serif",
                    }}
                    className="font-black leading-none mb-1.5 md:mb-3 pointer-events-auto text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl tracking-wide drop-shadow-lg"
                  >
                    <span style={{ color: "#EC008C" }}>NANMAI</span>
                    <br />
                    <span style={{ color: "#231F20" }}>APPALAM</span>
                  </h1>
                  <motion.h2
                    key={`tagline-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      fontFamily: "'Great Vibes', 'Segoe Script', cursive",
                      color: "#EC008C",
                    }}
                    className="text-[10px] sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-normal text-center drop-shadow-lg whitespace-nowrap"
                  >
                    <span className="block">
                      {slides[currentSlide].tagline
                        .split(" ")
                        .slice(0, -2)
                        .join(" ")}
                    </span>
                    <span className="block">
                      {slides[currentSlide].tagline
                        .split(" ")
                        .slice(-2)
                        .join(" ")}
                    </span>
                  </motion.h2>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-brand-pink w-4 sm:w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
