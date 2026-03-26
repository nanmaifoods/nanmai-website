import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blogs – Tips, Recipes & Stories',
  description: 'Discover recipes, health tips, and stories from the world of traditional South Indian cooking.',
};

const BLOGS = [
  { slug: 'health-benefits-of-appalam',          title: 'Health Benefits of Eating Appalam',              excerpt: 'Discover why appalam is more than just a crunchy side dish. Packed with protein from urad dal, low in calories, and naturally gluten-free, it might just be the healthiest part of your meal!',                                                         category: 'Health',              date: 'March 10, 2025', readTime: 4,  cover: '🌿', tags: ['health', 'nutrition'] },
  { slug: 'traditional-south-indian-cooking',     title: 'Traditional South Indian Cooking Tips',          excerpt: 'Master the art of South Indian cooking with these time-honoured techniques, secret spice combinations, and ingredient tips passed down through generations of Tamil home cooks.',                                                                    category: 'Recipes',             date: 'March 5, 2025',  readTime: 6,  cover: '🍲', tags: ['cooking', 'tips']    },
  { slug: 'how-appalam-is-made',                  title: 'How Our Appalam Is Made',                        excerpt: 'A behind-the-scenes look at our manufacturing process – from selecting the finest urad dal to the final crispy product that lands at your doorstep.',                                                                                                category: 'Behind The Scenes',   date: 'Feb 28, 2025',   readTime: 5,  cover: '🏭', tags: ['process', 'quality'] },
  { slug: 'best-ways-to-cook-appalam',            title: '5 Best Ways to Cook Your Appalam',               excerpt: 'Fried, roasted, microwaved or air-fried? We break down the pros and cons of every cooking method to help you get the crispiest, most flavourful appalam every single time.',                                                                       category: 'How-To',              date: 'Feb 20, 2025',   readTime: 5,  cover: '🔥', tags: ['cooking', 'tips']    },
  { slug: 'papad-in-indian-cuisine-history',      title: 'The History of Papad in Indian Cuisine',         excerpt: 'Papad has been a staple of Indian cuisine for over 2,000 years. Explore the fascinating history of this humble flatbread and how it evolved across different regions and cultures.',                                                                  category: 'Culture',             date: 'Feb 12, 2025',   readTime: 7,  cover: '📜', tags: ['history', 'culture'] },
  { slug: 'appalam-recipes-beyond-the-side-dish', title: 'Creative Appalam Recipes Beyond the Side Dish',  excerpt: 'Think appalam is just a side dish? Think again! Discover creative ways to incorporate crispy appalam into chaat, salads, sandwich wraps, and even fusion desserts.',                                                                                 category: 'Recipes',             date: 'Feb 5, 2025',    readTime: 6,  cover: '👨‍🍳', tags: ['recipes', 'creative'] },
];

const CATEGORIES = ['All', 'Health', 'Recipes', 'Behind The Scenes', 'How-To', 'Culture'];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-cream to-white py-16 px-4 text-center border-b border-gray-100">
        <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Our Blog</p>
        <h1 className="font-display text-4xl md:text-5xl font-black text-brand-dark mb-3">Stories & Recipes</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-lg">Tips, recipes, and stories from the world of traditional South Indian cooking.</p>
      </div>

      {/* Category filter */}
      <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat} className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-brand-pink hover:text-brand-pink transition-all first:bg-brand-pink first:text-white first:border-brand-pink">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured Post */}
        <Link href={`/blogs/${BLOGS[0].slug}`} className="block mb-12 card group overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-full bg-gradient-to-br from-brand-pink/10 to-brand-green/10 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
              {BLOGS[0].cover}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge bg-brand-pink text-white">Featured</span>
                <span className="badge bg-brand-pink/10 text-brand-pink">{BLOGS[0].category}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 group-hover:text-brand-pink transition-colors">{BLOGS[0].title}</h2>
              <p className="text-gray-500 mb-5 leading-relaxed">{BLOGS[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{BLOGS[0].date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{BLOGS[0].readTime} min</span>
                </div>
                <span className="text-brand-pink font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={15} /></span>
              </div>
            </div>
          </div>
        </Link>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.slice(1).map(post => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="card group flex flex-col cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-brand-cream to-white flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                {post.cover}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-brand-pink/10 text-brand-pink text-xs">{post.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{post.readTime} min</span>
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-brand-pink transition-colors line-clamp-2 flex-1">{post.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-0.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-brand-pink text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
