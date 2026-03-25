'use client';
import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalPrice } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={closeCart} />}

      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-pink" />
            <h2 className="font-display font-bold text-xl">Your Cart</h2>
            <span className="badge bg-brand-pink/10 text-brand-pink">{items.length} items</span>
          </div>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <Link href="/products" onClick={closeCart} className="btn-primary text-sm">
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white">
                  <Image
                    src={item.product.images[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    fill className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.product.weight}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-pink hover:text-brand-pink transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-brand-pink text-white flex items-center justify-center hover:bg-opacity-90 transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-pink">₹{(item.product.price * item.quantity).toFixed(0)}</span>
                      <button onClick={() => removeItem(item.product.id)} className="p-1 rounded hover:text-red-500 transition-colors text-gray-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-xl">₹{totalPrice().toFixed(0)}</span>
            </div>
            {totalPrice() < 499 && (
              <p className="text-xs text-brand-green bg-brand-green/10 rounded-lg px-3 py-2">
                🌿 Add ₹{(499 - totalPrice()).toFixed(0)} more for free delivery!
              </p>
            )}
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full justify-center">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
            <button onClick={closeCart} className="w-full text-center text-sm text-gray-500 hover:text-brand-pink transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
