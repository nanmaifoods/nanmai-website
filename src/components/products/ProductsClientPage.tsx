"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Filter,
  X,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/database";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.4, y: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const heroTextLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.45 },
  },
};

const heroTextRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
  },
};

const CATEGORIES = ["all", "appalam", "punjabi-pappad", "appalam-snack-pack", "appalam-chips"];
const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      )
    : 0;

  return (
    <div className="card group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative bg-gradient-to-br from-brand-cream to-white overflow-hidden">
          {discount > 0 && (
            <span className="absolute top-3 left-3 badge bg-brand-pink text-white z-10 text-xs">
              {discount}% OFF
            </span>
          )}
          {product.tags?.[0] && (
            <span className="absolute top-3 right-3 badge bg-brand-green text-white z-10 text-xs capitalize">
              {product.tags[0]}
            </span>
          )}
          {product.images?.[0] ? (
            <div className="group-hover:scale-105 transition-transform duration-500">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto block"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <img
                src="/images/new_assets/appalam_rotation.png"
                alt={product.name}
                className="w-56 h-56 object-contain mb-2"
              />
              <div className="text-xs text-gray-400 font-medium">
                {product.weight}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-base hover:text-brand-pink transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={12}
              className="text-brand-gold"
              fill="currentColor"
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">(48)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-xl text-brand-pink">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-gray-400 text-sm line-through">
                ₹{product.original_price}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} added!`);
            }}
            className="flex items-center gap-1.5 bg-brand-pink text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition-all hover:shadow-brand active:scale-95"
          >
            <ShoppingCart size={14} /> Add
          </button>
        </div>

        {product.stock < 10 && (
          <p className="text-xs text-orange-500 mt-2 font-medium">
            ⚡ Only {product.stock} left!
          </p>
        )}
      </div>
    </div>
  );
}

export function ProductsClientPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [mobileFilter, setMobileFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams.get("search") === "open" && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.is_active);
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (search)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "default")
      list = [...list].sort(
        (a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0),
      );
    return list;
  }, [products, category, sort, search, maxPrice]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative w-full bg-brand-cream overflow-visible flex items-center justify-center px-6 md:px-16 py-2 sm:py-4 md:py-6 gap-6 md:gap-10">
        <motion.h2
          variants={heroTextLeftVariants}
          initial="hidden"
          animate="visible"
          className="text-brand-dark font-black uppercase leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-right"
          style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
        >
          <span className="text-brand-pink">Authentic</span> Crunch,
        </motion.h2>

        <motion.div
          variants={heroImageVariants}
          initial="hidden"
          animate="visible"
          className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 z-10 -my-1 sm:-my-2 md:-my-3"
        >
          <img
            src="/images/hero-image.png"
            alt="Nanmai Appalam"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.h2
          variants={heroTextRightVariants}
          initial="hidden"
          animate="visible"
          className="text-brand-dark font-black uppercase leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-left"
          style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
        >
          <span className="text-brand-pink">Delivered</span> Daily.
        </motion.h2>
      </div>

      {/* Sticky Search + Sort bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field pl-11"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field max-w-[200px] sm:hidden"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setMobileFilter(true)}
              className="flex items-center gap-2 btn-secondary"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>
      </div>

      {mobileFilter && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileFilter(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div>
          {/* Sidebar Filters */}
          <aside
            className={`
            fixed inset-y-0 left-0 z-50 bg-white w-72 p-6 shadow-2xl overflow-y-auto transition-transform duration-300
            ${mobileFilter ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setMobileFilter(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Category */}
            <div className="mb-8">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">
                Category
              </h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setMobileFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${
                      category === cat
                        ? "bg-brand-pink text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">
                Max Price: <span className="text-brand-pink">₹{maxPrice}</span>
              </h4>
              <input
                type="range"
                min={100}
                max={1000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#12A6DF]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹100</span>
                <span>₹1000</span>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setCategory("all");
                setMaxPrice(1000);
                setSearch("");
              }}
              className="w-full btn-secondary text-sm py-2"
            >
              <Filter size={14} /> Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div>
            <p className="text-sm text-gray-500 mb-5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size={52} /> Loading
                  products...
                </span>
              ) : (
                `${filtered.length} products found`
              )}
            </p>
            {loading ? (
              <div className="text-center py-20">
                <Spinner size={140} className="mx-auto mb-4" />
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">😢</div>
                <p className="text-gray-500">No products match your filters.</p>
                <button
                  onClick={() => {
                    setCategory("all");
                    setSearch("");
                    setMaxPrice(1000);
                  }}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

