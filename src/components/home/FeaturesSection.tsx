import { Leaf, Award, Truck, RefreshCw, ShieldCheck, Flame } from 'lucide-react';

const FEATURES = [
  { icon: Leaf,       title: 'All Natural',        desc: 'Made with 100% natural ingredients, zero artificial additives or preservatives.',    color: 'green' },
  { icon: Award,      title: 'Superior Quality',   desc: 'FSSAI certified manufacturing with strict quality checks at every stage.',           color: 'pink' },
  { icon: Truck,      title: 'Fast Delivery',      desc: 'Quick delivery across India. Orders above ₹499 get free shipping.',                  color: 'gold' },
  { icon: Flame,      title: 'Traditional Recipe', desc: 'Authentic South Indian recipe passed down through generations.',                     color: 'green' },
  { icon: ShieldCheck,title: 'Safe & Hygienic',    desc: 'Produced in hygienic facility with food safety certifications.',                     color: 'pink' },
  { icon: RefreshCw,  title: 'Easy Returns',       desc: 'Not satisfied? We offer hassle-free returns within 7 days.',                        color: 'gold' },
];

const COLOR_MAP: Record<string, string> = {
  green: 'bg-brand-green/10 text-brand-green',
  pink:  'bg-brand-pink/10 text-brand-pink',
  gold:  'bg-brand-gold/20 text-brand-gold',
};

export function FeaturesSection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="section-title">The Nanmai Difference</h2>
          <p className="section-subtitle mx-auto">Quality you can taste, trust you can feel – with every crispy bite.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="card p-6 group cursor-default">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${COLOR_MAP[color]} group-hover:scale-110 transition-transform`}>
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
