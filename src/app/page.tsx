import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { createAdminClient } from "@/lib/supabase";
import { Product } from "@/types/database";

export const metadata: Metadata = {
  title: "Nanmai Appalam – Pure & Crispy Traditional Papads",
  description:
    "Shop premium quality traditional South Indian papads online. Crispy, tasty, made with superior ingredients. Free delivery above ₹499.",
};

// Disable caching to always show fresh data
export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching featured products:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts initialProducts={featuredProducts} />
      <StatsSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaSection />
    </>
  );
}
