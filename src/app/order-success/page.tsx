'use client';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
          <CheckCircle size={48} className="text-brand-green" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-black text-brand-dark mb-3">Order Confirmed! 🎉</h1>
        <p className="text-gray-500 text-lg mb-2">Thank you for your order!</p>
        {orderId && (
          <div className="inline-block bg-gray-100 rounded-xl px-4 py-2 mb-6">
            <span className="text-sm text-gray-500">Order ID: </span>
            <span className="font-mono font-bold text-brand-pink">{orderId}</span>
          </div>
        )}
        <div className="bg-brand-cream rounded-3xl p-6 mb-8 text-left space-y-3">
          <h3 className="font-bold text-base">What happens next?</h3>
          {[
            { icon: '📧', text: 'Order confirmation email sent to your inbox' },
            { icon: '📦', text: 'We\'ll pack your order with care within 24 hours' },
            { icon: '🚚', text: 'Your appalam will be shipped within 2–3 business days' },
            { icon: '🏠', text: 'Delivered fresh to your doorstep!' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-base shrink-0">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/products" className="btn-primary">
            <Package size={16} /> Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" /></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
