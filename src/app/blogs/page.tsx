import type { Metadata } from "next";
import { BlogsClientPage } from "@/components/blogs/BlogsClientPage";
import { createAdminClient } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Blogs – Tips, Recipes & Stories",
  description:
    "Discover recipes, health tips, and stories from the world of traditional South Indian cooking.",
};

// Disable caching to always show fresh data from Supabase
export const dynamic = "force-dynamic";

async function getBlogs() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogsClientPage initialBlogs={blogs} />;
}
