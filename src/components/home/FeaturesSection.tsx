import {
  Leaf,
  Award,
  Truck,
  RefreshCw,
  ShieldCheck,
  Flame,
} from "lucide-react";

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
      <OurStorySection />
      <FeatureCardsSection />
    </>
  );
}
