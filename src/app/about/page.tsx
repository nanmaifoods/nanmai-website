import type { Metadata } from "next";
import Image from "next/image";
import { AboutStorySection } from "@/components/about/AboutStorySection";

export const metadata: Metadata = {
  title: "About Us – Our Story",
  description:
    "Learn about Nanmai Appalam – our story, mission, and vision for bringing authentic South Indian appalam to every household.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-cream py-16 px-4">
        {/* Decorative broken appalam pieces */}
        <div className="absolute -top-10 -left-10 w-28 h-28 sm:-top-16 sm:-left-16 sm:w-56 sm:h-56 md:-top-24 md:-left-24 md:w-72 md:h-72 rotate-[-18deg] opacity-90 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/images/new_assets/broken1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-28 h-28 sm:-bottom-16 sm:-right-16 sm:w-56 sm:h-56 md:-bottom-24 md:-right-24 md:w-72 md:h-72 rotate-[14deg] opacity-90 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/images/new_assets/broken2.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
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
      <AboutStorySection
        eyebrow="Our Name"
        title="More Than a Name"
        image="/images/About Us Image 3.png"
        imageClassName="bg-gradient-to-br from-brand-cream to-brand-pink/10"
      >
        <p>
          In Tamil, Nanmai (நன்மை) means goodness. Not just in what we offer,
          but in how it is made, how it is shared, and how it is felt. For us,
          Nanmai is more than a name. It is a value we grew up with. Today,
          that goodness lives on in every appalam we make, bringing authentic
          flavor to those who seek quality papad online.
        </p>
      </AboutStorySection>

      {/* Section 2 - Where It All Began (image left, content right) */}
      <AboutStorySection
        eyebrow="Our Origin"
        title="Where It All Began"
        image="/images/About Us Image 2.png"
        imageClassName="bg-gradient-to-br from-brand-gold/10 to-brand-cream"
        imageOnLeft
        sectionClassName="bg-brand-cream"
      >
        <p>
          Nanmai began in a village, in a joint family, where meals were
          simple but full of life. We gathered around, shared everything, and
          waited for the smallest joys. One of them was always appalam.
          Crispy, warm, placed in the centre for everyone. And somehow,
          getting one extra appalam always felt like a win. We smiled over it.
          We waited for it. Sometimes… we even fought for it. Because that one
          crack, that one bite… was never just food. It was happiness,
          togetherness, and home. What we enjoyed back then as homemade
          appalam is what we now bring to you through carefully packed
          appalam packets, so you can enjoy the same feeling wherever you
          are, even if you are simply searching for appalam near me.
        </p>
      </AboutStorySection>

      {/* Section 3 - Why Nanmai Exists (content left, image right) */}
      <AboutStorySection
        eyebrow="Our Purpose"
        title="Why Nanmai Exists"
        image="/images/new_assets/about.png"
        imageClassName="bg-gradient-to-br from-brand-green/10 to-brand-cream"
        imgClassName="scale-125 object-[58%_48%]"
      >
        <p>
          As time passed, lifestyles changed, but the craving for authentic
          taste never did. We saw how traditional foods like appalam were
          becoming harder to find in their true form. What was once handmade
          and pure was slowly replaced by convenience without care. Nanmai
          exists to bring back that balance. To make it easy for anyone to
          enjoy authentic appalam, whether you are buying rice papad online or
          preparing a quick snack at home as a microwave pappadam or microwave
          papadum. Because tradition should not be lost. It should evolve and
          stay within reach.
        </p>
      </AboutStorySection>

      {/* Section 4 - Our Mission (image left, content right) */}
      <AboutStorySection
        eyebrow="What We Stand For"
        title="Our Mission"
        image="/images/blog_poster/about4.png"
        imageClassName="bg-gradient-to-br from-brand-pink/10 to-brand-cream"
        imageOnLeft
        sectionClassName="bg-brand-cream"
      >
        <p>
          At Nanmai, our mission is to bring back the true taste of South
          Indian appalam, crafted with an uncompromising commitment to
          quality, hygiene, and integrity. Rooted in the values we grew up
          with, we are dedicated to:
        </p>
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
          authentic options like appalam, jeera papad packet, and even
          regional favorites such as Punjabi Pappad, all available with the
          convenience of buying papad online.
        </p>
      </AboutStorySection>

      {/* Section 5 - Vision (content left, image right) */}
      <AboutStorySection
        eyebrow="Looking Ahead"
        title="Vision"
        image="/images/Abour Us Image 5.png"
        imageClassName="bg-gradient-to-br from-brand-gold/10 to-brand-cream"
      >
        <p>
          Our vision is to build Nanmai into a trusted household name, known
          for its commitment to authenticity, consistency, and care. We
          aspire to:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            Deliver consistent quality at scale, supported by modern and
            efficient processes
          </li>
          <li>Set a standard for hygienic, reliable food production</li>
          <li>
            Preserve traditional recipes while meeting today's expectations of
            quality
          </li>
          <li>
            Earn lasting trust by offering both value and excellence without
            compromise
          </li>
        </ul>
        <p>
          As we grow, we want Nanmai to be the name people think of when they
          look for authentic appalam, whether they are searching for rice
          papad online or simply choosing the best appalam packet for their
          home.
        </p>
      </AboutStorySection>
    </div>
  );
}
