"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, Shield, Leaf, Truck } from "lucide-react";

export function StoryHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [piecesVisible, setPiecesVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPiecesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-cream/50"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

      {/* Decorative broken appalam pieces - drop in and spin down into place once this section scrolls into view */}
      <div
        className={`absolute -top-12 -left-12 w-36 h-36 sm:-top-32 sm:-left-32 sm:w-96 sm:h-96 md:-top-48 md:-left-48 md:w-[36rem] md:h-[36rem] pointer-events-none ${
          piecesVisible ? "animate-drop-spin-in-left" : "opacity-0"
        }`}
      >
        <div
          className="relative w-full h-full animate-appalam-float"
          style={{ animationDuration: "4.5s" }}
        >
          <Image
            src="/images/new_assets/broken1.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div
        className={`absolute -bottom-12 -right-12 w-36 h-36 sm:-bottom-32 sm:-right-32 sm:w-96 sm:h-96 md:-bottom-48 md:-right-48 md:w-[36rem] md:h-[36rem] pointer-events-none ${
          piecesVisible ? "animate-drop-spin-in-right" : "opacity-0"
        }`}
      >
        <div
          className="relative w-full h-full animate-appalam-float"
          style={{ animationDuration: "5.5s", animationDelay: "1.2s" }}
        >
          <Image
            src="/images/new_assets/broken2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 lg:py-20">
        <div className="space-y-6 animate-fade-up z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-semibold mx-auto">
            <Leaf size={14} className="animate-float" />
            100% Natural Ingredients
          </div>

          <h1 className="font-display text-xl sm:text-3xl lg:text-4xl font-black leading-[1.05] text-brand-dark">
            Authentic South Indian{" "}
            <span className="text-gradient">Appalam</span>
            <br />
            Delivered to Your{" "}
            <span className="relative inline-block">
              <span className="text-brand-pink">Doorstep.</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M0 8 Q100 0 200 8"
                  stroke="#12A6DF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mx-auto max-w-3xl">
            Experience the true taste of tradition with Nanmai Appalam, your
            trusted place to buy papad online. Our appalam papad is made using
            time tested recipes that bring the authentic crunch of South India
            to every meal. Whether you are looking for rice papad online, a
            fresh appalam packet, or searching for appalam near me, we make it
            simple to enjoy quality and freshness wherever you are
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-4">
              Our Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="max-w-3xl mx-auto w-full pt-2">
            <div className="flex flex-wrap gap-5 justify-center sm:justify-between">
              {[
                { icon: Star, label: "4.9★ Rating", sub: "500+ Reviews" },
                { icon: Shield, label: "FSSAI Certified", sub: "Food Safe" },
                { icon: Leaf, label: "Natural", sub: "No Preservatives" },
                { icon: Truck, label: "Pan India Delivery", sub: "Fast & Fresh" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center">
                    <Icon size={14} className="text-brand-pink" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-dark">
                      {label}
                    </div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}