import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { OurStorySection, FeatureCardsSection } from '@/components/home/FeaturesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { StatsSection } from '@/components/home/StatsSection';
import { CtaSection } from '@/components/home/CtaSection';

export const metadata: Metadata = {
  title: 'Nanmai Appalam – Pure & Crispy Traditional Papads',
  description: 'Shop premium quality traditional South Indian papads online. Crispy, tasty, made with superior ingredients. Free delivery above ₹499.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <FeaturedProducts />
      <FeatureCardsSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaSection />
    </>
  );
}
