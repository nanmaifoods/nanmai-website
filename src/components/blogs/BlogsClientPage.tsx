"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Tag, Loader2 } from "lucide-react";

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  category: string;
  read_time: number;
  tags: string[];
  created_at: string;
}

const CATEGORIES = [
  "All",
  "Health",
  "Recipes",
  "Behind The Scenes",
  "How-To",
  "Culture",
];

interface BlogsClientPageProps {
  initialBlogs: Blog[];
}

export function BlogsClientPage({ initialBlogs }: BlogsClientPageProps) {
  const [blogs] = useState<Blog[]>(initialBlogs);
  const [category, setCategory] = useState("All");

  const filteredBlogs =
    category === "All" ? blogs : blogs.filter((b) => b.category === category);

  const featuredBlog = filteredBlogs[0];
  const otherBlogs = filteredBlogs.slice(1);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-2">No Blog Posts Yet</h2>
          <p className="text-gray-500">
            Check back soon for stories, recipes, and tips!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-cream to-white py-16 px-4 text-center border-b border-gray-100">
        <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
          Our Blog
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-black text-brand-dark mb-3">
          Stories & Recipes
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-lg">
          Tips, recipes, and stories from the world of traditional South Indian
          cooking.
        </p>
      </div>

      {/* Category filter */}
      <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                category === cat
                  ? "bg-brand-pink text-white border-brand-pink"
                  : "border-gray-200 hover:border-brand-pink hover:text-brand-pink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured Post */}
        {featuredBlog && (
          <Link
            href={`/blogs/${featuredBlog.slug}`}
            className="block mb-12 card group overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full bg-gradient-to-br from-brand-pink/10 to-brand-green/10 flex items-center justify-center overflow-hidden">
                {featuredBlog.cover_image ? (
                  <img
                    src={featuredBlog.cover_image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-500">
                    🌿
                  </span>
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-brand-pink text-white">
                    Featured
                  </span>
                  <span className="badge bg-brand-pink/10 text-brand-pink">
                    {featuredBlog.category}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-brand-pink transition-colors">
                  {featuredBlog.title}
                </h2>
                <p className="text-gray-500 mb-5 leading-relaxed">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{formatDate(featuredBlog.created_at)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {featuredBlog.read_time || 5} min
                    </span>
                  </div>
                  <span className="text-brand-pink font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherBlogs.map((post) => (
            <Link
              key={post.id}
              href={`/blogs/${post.slug}`}
              className="card group flex flex-col cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-brand-cream to-white flex items-center justify-center overflow-hidden">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
                    📝
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-brand-pink/10 text-brand-pink text-xs">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={11} />
                    {post.read_time || 5} min
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-brand-pink transition-colors line-clamp-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-0.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
                      >
                        <Tag size={9} /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {formatDate(post.created_at)}
                  </span>
                  <span className="text-brand-pink text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">No blogs found in this category.</p>
            <button
              onClick={() => setCategory("All")}
              className="btn-primary mt-4"
            >
              View All Blogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
