"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/database";
import toast from "react-hot-toast";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      )
    : 0;

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="card group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-52 bg-gradient-to-br from-brand-cream to-white overflow-hidden">
          {discount > 0 && (
            <span className="absolute top-3 left-3 badge bg-brand-pink text-white z-10">
              {discount}% OFF
            </span>
          )}
          {product.tags?.[0] && (
            <span className="absolute top-3 right-3 badge bg-brand-green text-white z-10 capitalize">
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
                <div className="text-xs text-gray-400">{product.weight}</div>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-base hover:text-brand-pink transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-brand-gold text-xs font-semibold">
            <Star size={11} fill="currentColor" /> 4.9
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">
          {product.description}
        </p>

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
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-brand-pink text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition-all hover:shadow-brand"
          >
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/products?featured=true");
        const data = await res.json();
        if (data.products) {
          setProducts(data.products.slice(0, 4)); // Limit to 4 products
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">
              Our Collection
            </p>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Handpicked favourites loved by thousands of families.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-secondary self-start md:self-auto whitespace-nowrap"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2
              size={32}
              className="animate-spin text-brand-pink mx-auto mb-4"
            />
            <p className="text-gray-500">Loading featured products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured products available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
