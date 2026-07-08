'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// ─── Scroll-into-view trigger ─────────────────────────────────────────────────
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasAnimated, target, duration]);

  return { count, ref };
}

// ─── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: 50000, label: 'Happy Customers', suffix: '+' },
  { value: 15,    label: 'Years of Excellence', suffix: '+' },
  { value: 10,    label: 'Product Variants', suffix: '+' },
  { value: 99,    label: 'Customer Satisfaction', suffix: '%' },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-pink to-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label, suffix }) => (
            <div key={label} className="space-y-1">
              <AnimatedStat value={value} suffix={suffix} />
              <div className="text-white/80 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="font-display font-black text-4xl md:text-5xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Priya Sharma',    location: 'Chennai',   rating: 5, text: 'Best appalam I have ever tasted! The crunch is perfect and lasts even after a few days. My family absolutely loves it.' },
  { name: 'Ramesh Kumar',    location: 'Bangalore', rating: 5, text: 'Ordered the garlic variant and it was amazing. Fast delivery and the packaging was great. Will definitely order again!' },
  { name: 'Anitha Rajan',    location: 'Madurai',   rating: 5, text: 'Been buying Nanmai Appalam for 3 years now. Never disappointed. The quality is always consistent and taste is authentic.' },
  { name: 'Karthik Srinivas', location: 'Hyderabad', rating: 5, text: 'Excellent quality and very reasonable price. The jumbo pack is great value for money. Highly recommended!' },
  { name: 'Meena Devi',      location: 'Coimbatore', rating: 5, text: 'Pure traditional taste. No artificial stuff. My kids love it and I feel good feeding them something natural.' },
  { name: 'Suresh Babu',     location: 'Trichy',    rating: 4, text: 'Good product overall. Delivery was quick and the appalams were fresh. The classic variant is my favourite.' },
];

const testimonialContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const testimonialItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function TestimonialsSection() {
  const { ref: sectionRef, inView: piecesVisible } = useInView<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 bg-brand-cream">
      {/* Decorative broken appalam pieces - drop in and spin down into place once this section scrolls into view */}
      <div
        className={`absolute -top-12 -left-12 w-36 h-36 sm:-top-32 sm:-left-32 sm:w-96 sm:h-96 md:-top-48 md:-left-48 md:w-[36rem] md:h-[36rem] rotate-[-18deg] pointer-events-none ${
          piecesVisible ? 'animate-drop-spin-in-left' : 'opacity-0'
        }`}
      >
        <div
          className="relative w-full h-full animate-appalam-float"
          style={{ animationDuration: '4.5s' }}
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
        className={`absolute -bottom-12 -right-12 w-36 h-36 sm:-bottom-32 sm:-right-32 sm:w-96 sm:h-96 md:-bottom-48 md:-right-48 md:w-[36rem] md:h-[36rem] rotate-[14deg] pointer-events-none ${
          piecesVisible ? 'animate-drop-spin-in-right' : 'opacity-0'
        }`}
      >
        <div
          className="relative w-full h-full animate-appalam-float"
          style={{ animationDuration: '5.5s', animationDelay: '1.2s' }}
        >
          <Image
            src="/images/new_assets/broken2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">Real stories from families who love Nanmai.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={testimonialContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "-150px 0px -150px 0px" }}
        >
          {TESTIMONIALS.map(({ name, location, rating, text }) => (
            <motion.div
              key={name}
              variants={testimonialItemVariants}
              whileHover={{ y: -6 }}
              className="card p-6 flex flex-col gap-4"
            >
              <Quote size={28} className="text-brand-pink/30" />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{text}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="font-bold text-sm">{name}</div>
                  <div className="text-xs text-gray-400">{location}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-brand-gold" fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────
const MotionLink = motion.create(Link);

const blogContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const blogItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const BLOG_POSTS = [
  { slug: 'health-benefits-of-appalam', title: 'Health Benefits of Eating Appalam', excerpt: 'Discover why appalam is more than just a crunchy side dish – it packs surprising nutritional benefits.', category: 'Health', date: 'Mar 10, 2025', readTime: 4, cover: '/images/Blog 1_11zon.png' },
  { slug: 'traditional-south-indian-cooking', title: 'Traditional South Indian Cooking Tips', excerpt: 'Master the art of South Indian cooking with these time-honoured techniques and ingredient secrets.', category: 'Recipes', date: 'Mar 5, 2025', readTime: 6, cover: '/images/Blog 2_11zon.png' },
  { slug: 'how-appalam-is-made', title: 'How Our Appalam Is Made', excerpt: 'A behind-the-scenes look at our manufacturing process – from raw ingredients to the final crispy product.', category: 'Behind The Scenes', date: 'Feb 28, 2025', readTime: 5, cover: '/images/Blog 3_11zon.png' },
];

export function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">From Our Blog</p>
            <h2 className="section-title">Latest Stories</h2>
            <p className="section-subtitle">Tips, recipes & stories from the world of appalam.</p>
          </div>
          <Link href="/blogs" className="btn-secondary self-start whitespace-nowrap">View All <ArrowRight size={16} /></Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={blogContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "-150px 0px -150px 0px" }}
        >
          {BLOG_POSTS.map((post) => (
            <MotionLink
              key={post.slug}
              href={`/blogs/${post.slug}`}
              variants={blogItemVariants}
              whileHover={{ y: -6 }}
              className="card group cursor-pointer"
            >
              <div className="h-44 bg-gradient-to-br from-brand-cream to-white overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-brand-pink/10 text-brand-pink">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.readTime} min read</span>
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-brand-pink transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-brand-pink text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={13} /></span>
                </div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function CtaSection() {
  return (
    <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 leaf-bg" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-3">Limited Time Offer</p>
        <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
          Get <span className="text-brand-gold">₹50 OFF</span> Your First Order
        </h2>
        <p className="text-gray-400 text-lg mb-8">Use code <span className="text-white font-mono font-bold bg-white/10 px-3 py-1 rounded-lg">NANMAI50</span> at checkout</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary text-base px-8 py-4">Shop Now <ArrowRight size={18} /></Link>
          <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-dark text-base px-8 py-4">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
