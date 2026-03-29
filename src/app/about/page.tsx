import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Our Story",
  description:
    "Learn about Nanmai Appalam – our story, mission, and vision for bringing authentic South Indian appalam to every household.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-cream py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
            Our Story
          </p>
          <h1 className="section-title mb-4">About Nanmai</h1>
          <p className="section-subtitle mx-auto">
            At Nanmai, we bring you the authentic taste of அப்பளம் - a beloved
            staple in South Indian homes for generations. </p>
        </div>
      </section>

      {/* Section 1 - More Than a Name (content left, image right) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              Our Name
            </p>
            <h2 className="section-title mb-5">More Than a Name</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>In Tamil, Nanmai (நன்மை) means goodness.</p>
              <p>
                Not just in what we offer, but in how it is made, how it is
                shared, and how it is felt.
              </p>
              <p>
                For us, Nanmai is more than a name. It is a value we grew up
                with.
              </p>
              <p>
                Today, that goodness lives on in every appalam papad we make,
                bringing authentic flavor to those who seek quality papad
                online.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-cream to-brand-pink/10">
            <img
              src="/images/about-img1.png"
              alt="Nanmai Appalam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2 - Where It All Began (image left, content right) */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-gold/10 to-brand-cream order-last lg:order-first">
            <img
              src="/images/about-img2.png"
              alt="Nanmai Appalam"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              Our Origin
            </p>
            <h2 className="section-title mb-5">Where It All Began</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Nanmai began in a village, in a joint family, where meals were
                simple but full of life.
              </p>
              <p>
                We gathered around, shared everything, and waited for the
                smallest joys. One of them was always appalam.
              </p>
              <p>
                Crispy, warm, placed in the centre for everyone. And somehow,
                getting one extra appalam always felt like a win.
              </p>
              <p>
                We smiled over it. We waited for it. Sometimes… we even fought
                for it.
              </p>
              <p>
                Because that one crack, that one bite… was never just food. It
                was happiness, togetherness, and home.
              </p>
              <p>
                What we enjoyed back then as homemade appalam is what we now
                bring to you through carefully packed appalam packets, so you
                can enjoy the same feeling wherever you are, even if you are
                simply searching for appalam near me.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Why Nanmai Exists (content left, image right) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              Our Purpose
            </p>
            <h2 className="section-title mb-5">Why Nanmai Exists</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                As time passed, lifestyles changed, but the craving for
                authentic taste never did.
              </p>
              <p>
                We saw how traditional foods like appalam were becoming harder
                to find in their true form. What was once handmade and pure was
                slowly replaced by convenience without care.
              </p>
              <p>
                Nanmai exists to bring back that balance. To make it easy for
                anyone to enjoy authentic appalam, whether you are buying rice
                papad online or preparing a quick snack at home as a microwave
                pappadam or microwave papadum.
              </p>
              <p>
                Because tradition should not be lost. It should evolve and stay
                within reach.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-green/10 to-brand-cream">
            <img
              src="/images/new-hero-image.png"
              alt="Nanmai Appalam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4 - Our Mission (image left, content right) */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-pink/10 to-brand-cream order-last lg:order-first">
            <img
              src="/images/new-hero-image.png"
              alt="Nanmai Appalam"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="section-title mb-5">Our Mission</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                At Nanmai, our mission is to bring back the true taste of South
                Indian appalam, crafted with an uncompromising commitment to
                quality, hygiene, and integrity.
              </p>
              <p>Rooted in the values we grew up with, we are dedicated to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Upholding high standards of quality and food safety</li>
                <li>Using carefully selected, honest ingredients</li>
                <li>
                  Maintaining a clean, simple formulation without unnecessary
                  additions
                </li>
                <li>
                  Making traditional, high quality food accessible for everyday
                  living
                </li>
              </ul>
              <p>
                We also aim to make it easier for families everywhere to enjoy
                authentic options like appalam papad, jeera papad packet, and
                even regional favorites such as Punjabi Pappad, all available
                with the convenience of buying papad online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Vision (content left, image right) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              Looking Ahead
            </p>
            <h2 className="section-title mb-5">Vision</h2>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>
                Our vision is to build Nanmai into a trusted household name,
                known for its commitment to authenticity, consistency, and care.
              </p>
              <p>We aspire to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  Deliver consistent quality at scale, supported by modern and
                  efficient processes
                </li>
                <li>Set a standard for hygienic, reliable food production</li>
                <li>
                  Preserve traditional recipes while meeting today's
                  expectations of quality
                </li>
                <li>
                  Earn lasting trust by offering both value and excellence
                  without compromise
                </li>
              </ul>
              <p>
                As we grow, we want Nanmai to be the name people think of when
                they look for authentic appalam, whether they are searching for
                rice papad online or simply choosing the best appalam packet for
                their home.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-gold/10 to-brand-cream">
            <img
              src="/images/new-hero-image.png"
              alt="Nanmai Appalam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-pink to-brand-green text-white text-center">
        <h2 className="font-display text-3xl md:text-4xl font-black mb-4">
          Taste the Nanmai Difference
        </h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          Join thousands of families who trust Nanmai for authentic, premium
          quality appalam.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-white text-brand-pink font-bold px-8 py-4 rounded-full hover:bg-brand-cream transition-colors"
        >
          Shop Now <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
