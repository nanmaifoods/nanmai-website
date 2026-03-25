"use client";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Shield,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/database";
import toast from "react-hot-toast";
import Link from "next/link";

const FAQS = [
  {
    q: "How should I store the appalam?",
    a: "Store in an airtight container in a cool, dry place. It stays fresh for up to 6 months when stored properly.",
  },
  {
    q: "Can I microwave it?",
    a: "Yes! Microwave for 30-45 seconds on high for a quick oil-free crispy result.",
  },
  {
    q: "Is it suitable for vegans?",
    a: "Yes, all our appalams are 100% vegan and vegetarian friendly.",
  },
  {
    q: "What is the shelf life?",
    a: "The shelf life is 12 months from the date of manufacture when stored correctly.",
  },
];

export function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        } else {
          toast.error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={32}
            className="animate-spin text-brand-pink mx-auto mb-4"
          />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      )
    : 0;

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${qty}x ${product.name} added to cart!`);
  };

  const nutritionInfo = product.nutritional_info as Record<
    string,
    number
  > | null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-pink transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-brand-pink transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-brand-dark font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-cream to-white h-96 flex items-center justify-center shadow-card">
              {discount > 0 && (
                <span className="absolute top-4 left-4 badge bg-brand-pink text-white text-sm px-4 py-1.5">
                  {discount}% OFF
                </span>
              )}
              {product.tags?.[0] && (
                <span className="absolute top-4 right-4 badge bg-brand-green text-white text-sm px-4 py-1.5 capitalize">
                  {product.tags[0]}
                </span>
              )}
              <div className="text-center animate-float">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    <div className="text-9xl mb-4">🫓</div>
                    <div className="text-sm text-gray-400 font-medium">
                      {product.weight}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {product.images?.length && product.images.length > 1
                ? product.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cream to-white flex items-center justify-center text-3xl cursor-pointer border-2 border-transparent hover:border-brand-pink transition-colors overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                : [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-cream to-white flex items-center justify-center text-3xl cursor-pointer border-2 border-transparent hover:border-brand-pink transition-colors"
                    >
                      🫓
                    </div>
                  ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-brand-green/10 text-brand-green capitalize">
                  {product.category}
                </span>
                <span className="badge bg-brand-cream text-brand-dark">
                  {product.weight}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-brand-dark">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-brand-gold"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.9</span>
                <span className="text-sm text-gray-400">(128 reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-black text-4xl text-brand-pink">
                ₹{product.price}
              </span>
              {product.original_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.original_price}
                  </span>
                  <span className="badge bg-brand-pink/10 text-brand-pink font-bold">
                    Save ₹{product.original_price - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-5 py-2.5 font-bold text-lg min-w-[50px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-4 py-2.5 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-400">
                  {product.stock} in stock
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="btn-primary flex-1 justify-center py-4 text-base"
              >
                <ShoppingCart size={18} /> Add to Cart – ₹{product.price * qty}
              </button>
              <Link
                href="/checkout"
                onClick={() => addItem(product, qty)}
                className="btn-secondary flex-1 justify-center py-4 text-base text-center"
              >
                Buy Now
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { Icon: Truck, label: "Free Delivery", sub: "Above ₹499" },
                { Icon: Shield, label: "FSSAI Certified", sub: "Food Safe" },
                { Icon: RotateCcw, label: "Easy Returns", sub: "7 Day Policy" },
              ].map(({ Icon, label, sub }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-2xl bg-gray-50"
                >
                  <Icon size={20} className="text-brand-pink mx-auto mb-1" />
                  <div className="text-xs font-bold">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Ingredients */}
          {product.ingredients && (
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Nutrition */}
          {nutritionInfo && (
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Nutrition (per 100g)</h3>
              <div className="space-y-3">
                {Object.entries(nutritionInfo).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-bold">
                      {val}
                      {key === "calories" ? " kcal" : "g"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="mt-12 max-w-2xl">
          <h3 className="font-display font-bold text-2xl mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base">
                    {q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-brand-pink shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
