"use client";

import {
  Leaf,
  Award,
  Truck,
  RefreshCw,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: Leaf,
    title: "All Natural",
    desc: "Made with 100% natural ingredients, zero artificial additives or preservatives.",
    color: "green",
  },
  {
    icon: Award,
    title: "Superior Quality",
    desc: "FSSAI certified manufacturing with strict quality checks at every stage.",
    color: "pink",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Quick delivery across India. Orders above ₹499 get free shipping.",
    color: "gold",
  },
  {
    icon: Flame,
    title: "Traditional Recipe",
    desc: "Authentic South Indian recipe passed down through generations.",
    color: "green",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Hygienic",
    desc: "Produced in hygienic facility with food safety certifications.",
    color: "pink",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Not satisfied? We offer hassle-free returns within 7 days.",
    color: "gold",
  },
];

const COLOR_MAP: Record<string, string> = {
  green: "bg-brand-green/10 text-brand-green",
  pink: "bg-brand-pink/10 text-brand-pink",
  gold: "bg-brand-gold/20 text-brand-gold",
};

export function PartnersSection() {
  const partnerLogos = [
    "/images/logo/image 426.png",
    "/images/logo/image 427.png",
    "/images/logo/image 428.png",
    "/images/logo/image 429.png",
    "/images/logo/image 430.png",
    "/images/logo/image 431.png",
    "/images/logo/image 432.png",
    "/images/logo/image 433.png",
    "/images/logo/image 434.png",
    "/images/logo/image 435.png",
    "/images/logo/image 436.png",
    "/images/logo/image 437.png",
    "/images/logo/image 438.png",
    "/images/logo/image 440.png",
    "/images/logo/image 441.png",
    "/images/logo/image 442.png",
    "/images/logo/image 443.png",
    "/images/logo/image 444.png",
    "/images/logo/image 445.png",
    "/images/logo/image 446.png",
    "/images/logo/image 447.png",
    "/images/logo/image 448.png",
    "/images/logo/image 449.png",
    "/images/logo/image 450.png",
    "/images/logo/image 451.png",
  ];

  const [offset, setOffset] = useState(0);
  const visibleCount = 4;
  const totalSlides = Math.ceil(partnerLogos.length / visibleCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const currentLogos = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (offset * visibleCount + i) % partnerLogos.length;
    currentLogos.push(partnerLogos[index]);
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
            Our Partners
          </p>
          <h2 className="section-title text-2xl font-bold">
            Trusted by Industry Leaders
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${offset * (100 / visibleCount)}%)` }}
          >
            {partnerLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/4 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center h-24"
                >
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    className="h-full w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setOffset(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === offset ? 'bg-brand-pink w-5' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function OurStorySection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-0">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
            Pure Traditional Trusted
          </p>
          <h2 className="section-title">
            {" "}
            Our Story Tradition in Every Crunch
          </h2>
          <p className="section-subtitle max-w-7xl mx-auto px-4 sm:px-6">
            {" "}
            At Nanmai, we are passionate about preserving the authentic taste of
            அப்பளம், a staple loved in South Indian homes for generations. Each
            batch is carefully prepared using locally sourced ingredients and
            traditional methods to ensure the same homemade quality and flavor.
            Our appalams are made for both tradition and convenience. You can
            enjoy them roasted, fried, or quickly prepared as a microwave
            pappadam for a crisp snack in minutes. From microwave papadum
            options to classic varieties, we offer versatility for every
            lifestyle. We also bring you a wide range of flavors including jeera
            papad packet, Punjabi Pappad, and traditional rice varieties, all
            crafted with the same commitment to quality. With Nanmai, enjoying
            authentic papad online has never been easier.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FeatureCardsSection() {
  return (
    <section className="py-10 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card p-6 group cursor-default">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${COLOR_MAP[color]} group-hover:scale-110 transition-transform`}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <>
      <PartnersSection />
      <OurStorySection />
      <FeatureCardsSection />
    </>
  );
}
