import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase";

// Disable caching to always show fresh data
export const dynamic = "force-dynamic";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  read_time: number;
  author: string;
  views: number;
  created_at: string;
}

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) {
      return null;
    }

    const blogData = data as unknown as BlogPost;

    // Increment views
    await (supabase as any)
      .from("blogs")
      .update({ views: (blogData.views || 0) + 1 })
      .eq("id", blogData.id);

    return blogData;
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

function parseContent(md: string) {
  const lines = md.trim().split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h2
          key={i}
          className="font-display text-2xl font-bold mt-8 mb-4 text-brand-dark"
        >
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="flex gap-2 text-gray-600 leading-relaxed">
          <span className="text-brand-pink mt-1.5 shrink-0">•</span>
          <span
            dangerouslySetInnerHTML={{
              __html: line
                .slice(2)
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </li>
      );
    if (line === "") return <br key={i} />;
    return (
      <p
        key={i}
        className="text-gray-600 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        }}
      />
    );
  });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-brand-pink">
            Home
          </Link>
          <ChevronRight size={14} className="mt-0.5" />
          <Link href="/blogs" className="hover:text-brand-pink">
            Blogs
          </Link>
          <ChevronRight size={14} className="mt-0.5" />
          <span className="text-brand-dark truncate max-w-[200px]">
            {blog.title}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-cream via-white to-brand-green/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-brand-pink text-sm font-medium hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-brand-pink text-white">
              {blog.category}
            </span>
            {blog.tags?.map((t: string) => (
              <span
                key={t}
                className="badge bg-gray-100 text-gray-600 flex items-center gap-1"
              >
                <Tag size={10} />
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black text-brand-dark leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-2xl">
            {blog.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink font-bold text-sm">
                {(blog.author || "N")[0]}
              </div>
              <div>
                <div className="font-semibold text-brand-dark text-sm">
                  {blog.author || "Nanmai Team"}
                </div>
              </div>
            </div>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formatDate(blog.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {blog.read_time || 5} min read
            </span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 mb-8">
        <div className="h-64 md:h-80 rounded-3xl shadow-card overflow-hidden bg-gradient-to-br from-brand-cream to-white flex items-center justify-center">
          {blog.cover_image ? (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-8xl">🌿</span>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="prose prose-lg max-w-none">
          <ul className="space-y-1 list-none p-0">
            {blog.content ? (
              parseContent(blog.content)
            ) : (
              <p className="text-gray-500">No content available.</p>
            )}
          </ul>
        </div>

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <p className="font-semibold text-gray-700">Share this article:</p>
          <div className="flex gap-3">
            {["Twitter", "Facebook", "WhatsApp"].map((platform) => (
              <button
                key={platform}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:border-brand-pink hover:text-brand-pink transition-colors flex items-center gap-1.5"
              >
                <Share2 size={13} /> {platform}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-brand-pink/10 to-brand-green/10 text-center">
          <p className="font-display font-bold text-xl mb-2">
            Enjoyed this article?
          </p>
          <p className="text-gray-500 mb-4">
            Try our premium appalams and experience the taste for yourself.
          </p>
          <Link href="/products" className="btn-primary">
            Shop Nanmai Appalam
          </Link>
        </div>
      </article>
    </div>
  );
}
