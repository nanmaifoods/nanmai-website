"use client";
import { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Star,
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/database";
import toast from "react-hot-toast";
import Link from "next/link";

const CATEGORIES = ["all", "appalam", "punjabi-pappad", "appalam-snack-pack", "appalam-chips"];
const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "name-asc", label: "Name: A–Z" },
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
        <div className="relative h-52 bg-gradient-to-br from-brand-cream to-white overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-2">🫓</div>
                <div className="text-xs text-gray-400 font-medium">
                  {product.weight}
                </div>
              </div>
            )}
          </div>
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
      <div className="relative w-full bg-brand-cream overflow-visible flex items-center justify-center px-6 md:px-16 py-10 gap-6 md:gap-10">
        <h2
          className="text-brand-dark font-black uppercase leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-right"
          style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
        >
          <span className="text-brand-pink">Authentic</span> Crunch,
        </h2>

        <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 flex-shrink-0 z-10 -my-10 sm:-my-16 md:-my-20">
          <img
            src="/images/hero-image.png"
            alt="Nanmai Appalam"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <h2
          className="text-brand-dark font-black uppercase leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-left"
          style={{ fontFamily: "Impact, Arial Black, sans-serif" }}
        >
          <span className="text-brand-pink">Delivered</span> Daily.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-11"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field max-w-[200px]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setMobileFilter(true)}
            className="sm:hidden flex items-center gap-2 btn-secondary"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`
            fixed inset-y-0 left-0 z-50 bg-white w-72 p-6 shadow-2xl overflow-y-auto transition-transform duration-300
            sm:static sm:z-auto sm:shadow-none sm:w-64 sm:translate-x-0 sm:block sm:shrink-0
            ${mobileFilter ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          `}
          >
            <div className="flex items-center justify-between mb-6 sm:hidden">
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
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Loading
                  products...
                </span>
              ) : (
                `${filtered.length} products found`
              )}
            </p>
            {loading ? (
              <div className="text-center py-20">
                <Loader2
                  size={32}
                  className="animate-spin text-brand-pink mx-auto mb-4"
                />
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
