import type { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Award, Heart, Users, Target, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us – Our Story',
  description: 'Learn about Nanmai Appalam – 15 years of crafting premium quality traditional South Indian papads with love and superior ingredients.',
};

const TIMELINE = [
  { year: '2009', title: 'The Beginning', desc: 'Started as a small family recipe, making appalams for friends and neighbours in Chennai.' },
  { year: '2012', title: 'First Factory', desc: 'Opened our first small manufacturing unit, growing from local to citywide distribution.' },
  { year: '2016', title: 'FSSAI Certification', desc: 'Received our FSSAI food safety certification, reinforcing our commitment to quality.' },
  { year: '2019', title: 'Pan-India Launch', desc: 'Expanded distribution to major cities across South India, serving thousands of families.' },
  { year: '2023', title: 'Online Store', desc: 'Launched our online store, making Nanmai Appalam accessible to customers nationwide.' },
  { year: '2024', title: 'Today', desc: 'Proudly serving 50,000+ families with 10+ product variants and continued commitment to tradition.' },
];

const VALUES = [
  { icon: Leaf,   title: 'Natural Ingredients',  desc: 'We never compromise on ingredient quality. Every appalam starts with the finest urad dal and real spices.' },
  { icon: Award,  title: 'Superior Quality',      desc: 'Rigorous quality checks at every stage ensure that every pack meets our high standards.' },
  { icon: Heart,  title: 'Made with Love',        desc: 'Our recipes are crafted with the same care and attention as a home kitchen, just at scale.' },
  { icon: Users,  title: 'Community First',       desc: 'We support local farmers and employ women from the community in our production team.' },
  { icon: Target, title: 'Zero Compromise',       desc: 'We have never used artificial preservatives, colours, or flavours. And we never will.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-dark to-brand-dark/90 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 leaf-bg" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-pink/20 border border-brand-pink/30 text-brand-pink px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Leaf size={14} /> Est. 2009
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-5 leading-tight">
            15 Years of <span className="text-brand-pink">Pure</span> Crunch
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Nanmai Appalam began as a family tradition and grew into a brand trusted by over 50,000 families across India. Our story is one of passion, quality, and an unbreakable commitment to authentic taste.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Our Mission</p>
            <h2 className="section-title mb-5">Bringing Authentic Taste to Every Table</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Nanmai Appalam, we believe that food is more than sustenance — it's memory, culture, and connection. Our mission is to preserve and share the authentic taste of traditional South Indian appalam, crafted with the same care and ingredients our grandmothers used.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The word "Nanmai" (நன்மை) in Tamil means "goodness" — and that's precisely what we put into every pack. Goodness in ingredients, goodness in process, and goodness in every crispy bite.
            </p>
            <Link href="/products" className="btn-primary">
              Explore Our Products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '50,000+', label: 'Happy Customers', bg: 'bg-brand-pink text-white' },
              { value: '15+',     label: 'Years of Excellence', bg: 'bg-brand-green text-white' },
              { value: '10+',     label: 'Product Variants', bg: 'bg-brand-gold text-brand-dark' },
              { value: '99%',     label: 'Satisfaction Rate', bg: 'bg-brand-dark text-white' },
            ].map(({ value, label, bg }) => (
              <div key={label} className={`${bg} rounded-3xl p-6 text-center`}>
                <div className="font-display font-black text-4xl">{value}</div>
                <div className="text-sm opacity-80 mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">What Drives Us</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center group">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-brand-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="section-title">15 Years of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-pink to-brand-green -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <div key={year} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card p-5 inline-block max-w-xs md:max-w-full w-full">
                      <div className="font-display font-bold text-2xl text-brand-pink">{year}</div>
                      <div className="font-bold text-base mt-1">{title}</div>
                      <div className="text-gray-500 text-sm mt-1">{desc}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 rounded-full bg-brand-pink border-4 border-white shadow-brand shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-pink to-brand-green text-white text-center">
        <h2 className="font-display text-3xl md:text-4xl font-black mb-4">Taste the Nanmai Difference</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">Join 50,000+ families who trust Nanmai for authentic, premium quality appalam.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-white text-brand-pink font-bold px-8 py-4 rounded-full hover:bg-brand-cream transition-colors">
          Shop Now <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
