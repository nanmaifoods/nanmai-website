"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Leaf, Truck } from "lucide-react";

export function StoryHeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-cream/50">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-green/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center animate-fade-up z-10">
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] w-full bg-gradient-to-br from-brand-cream to-brand-pink/10">
              <Image
                src="/images/new_assets/nanmai.jpeg"
                alt="Nanmai Appalam"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-semibold">
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

            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the true taste of tradition with Nanmai Appalam, your
              trusted place to buy papad online. Our appalam papad is made using
              time tested recipes that bring the authentic crunch of South India
              to every meal. Whether you are looking for rice papad online, a
              fresh appalam packet, or searching for appalam near me, we make it
              simple to enjoy quality and freshness wherever you are
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-primary text-base px-8 py-4"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary text-base px-8 py-4">
                Our Story
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="w-full pt-2">
              <div className="flex flex-nowrap items-center justify-between gap-2">
                {[
                  { icon: Star, label: "4.9★ Rating", sub: "500+ Reviews" },
                  { icon: Shield, label: "FSSAI Certified", sub: "Food Safe" },
                  { icon: Leaf, label: "Natural", sub: "No Preservatives" },
                  {
                    icon: Truck,
                    label: "Pan India Delivery",
                    sub: "Fast & Fresh",
                  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 min-w-0"
                  >
                    <div className="w-7 h-7 shrink-0 rounded-full bg-brand-pink/10 flex items-center justify-center">
                      <Icon size={13} className="text-brand-pink" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-brand-dark whitespace-nowrap">
                        {label}
                      </div>
                      <div className="text-[10px] text-gray-400 whitespace-nowrap">
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
