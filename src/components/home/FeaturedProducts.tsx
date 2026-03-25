'use client';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/database';
import toast from 'react-hot-toast';

// Mock data – replaced by Supabase fetch in production
const MOCK_PRODUCTS: Product[] = [
  { id: '1', created_at: '', name: 'Classic Appalam', slug: 'classic-appalam', description: 'The original crispy papad', price: 149, original_price: 199, images: [], category: 'classic', weight: '200g', stock: 50, is_active: true, is_featured: true, tags: ['bestseller'], ingredients: null, nutritional_info: null },
  { id: '2', created_at: '', name: 'Garlic Appalam', slug: 'garlic-appalam', description: 'Flavoured with fresh garlic', price: 179, original_price: 229, images: [], category: 'flavoured', weight: '200g', stock: 40, is_active: true, is_featured: true, tags: ['popular'], ingredients: null, nutritional_info: null },
  { id: '3', created_at: '', name: 'Pepper Appalam', slug: 'pepper-appalam', description: 'Black pepper spiced crunch', price: 179, original_price: 219, images: [], category: 'flavoured', weight: '200g', stock: 35, is_active: true, is_featured: true, tags: ['spicy'], ingredients: null, nutritional_info: null },
  { id: '4', created_at: '', name: 'Jumbo Pack', slug: 'jumbo-pack', description: 'Big pack for big families', price: 449, original_price: 599, images: [], category: 'packs', weight: '1kg', stock: 20, is_active: true, is_featured: true, tags: ['value'], ingredients: null, nutritional_info: null },
];

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-brand-cream to-white overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 badge bg-brand-pink text-white z-10">{discount}% OFF</span>
        )}
        {product.tags[0] && (
          <span className="absolute top-3 right-3 badge bg-brand-green text-white z-10 capitalize">{product.tags[0]}</span>
        )}
        <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="text-center">
            <div className="text-6xl mb-2">🫓</div>
            <div className="text-xs text-gray-400">{product.weight}</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-base">{product.name}</h3>
          <div className="flex items-center gap-1 text-brand-gold text-xs font-semibold">
            <Star size={11} fill="currentColor" /> 4.9
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-xl text-brand-pink">₹{product.price}</span>
            {product.original_price && (
              <span className="text-gray-400 text-sm line-through">₹{product.original_price}</span>
            )}
          </div>
          <button onClick={handleAdd} className="flex items-center gap-1.5 bg-brand-pink text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition-all hover:shadow-brand">
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-brand-pink font-semibold text-sm uppercase tracking-widest mb-2">Our Collection</p>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked favourites loved by thousands of families.</p>
          </div>
          <Link href="/products" className="btn-secondary self-start md:self-auto whitespace-nowrap">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
