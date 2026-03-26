import type { Metadata } from "next";
import { BlogsClientPage } from "@/components/blogs/BlogsClientPage";

export const metadata: Metadata = {
  title: "Blogs – Tips, Recipes & Stories",
  description:
    "Discover recipes, health tips, and stories from the world of traditional South Indian cooking.",
};

export default function BlogsPage() {
  return <BlogsClientPage />;
}
