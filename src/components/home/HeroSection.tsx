"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Leaf, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-cream/50">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* ── LEFT: Text ── */}
        <div className="space-y-6 animate-fade-up z-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-semibold">
            <Leaf size={14} className="animate-float" />
            100% Natural Ingredients
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-brand-dark">
            Simply <span className="text-gradient">Crispy.</span>
            <br />
            Simply{" "}
            <span className="relative inline-block">
              <span className="text-brand-pink">Tasty.</span>
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

          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            Premium quality traditional South Indian appalams, crafted with
            superior ingredients for the perfect crunch every time.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-base px-8 py-4">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn-secondary text-base px-8 py-4">
              Our Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-5 pt-2">
            {[
              { icon: Star, label: "4.9★ Rating", sub: "500+ Reviews" },
              { icon: Shield, label: "FSSAI Certified", sub: "Food Safe" },
              { icon: Leaf, label: "Natural", sub: "No Preservatives" },
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

        {/* ── RIGHT: Just the image, nothing else ── */}
        <div
          className="relative flex items-center justify-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative w-full max-w-lg h-[420px] md:h-[520px]">
            <Image
              src="/images/hero-image.png"
              alt="Nanmai Appalam – Premium South Indian Appalam"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-1 text-gray-400">
        <span className="text-xs">Scroll Down</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
