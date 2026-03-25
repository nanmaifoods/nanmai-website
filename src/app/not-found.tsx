import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-display font-black text-[120px] leading-none text-brand-pink/20 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-brand-dark mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16}/> Go Home
          </Link>
          <Link href="/products" className="btn-secondary">
            Shop Products <ArrowRight size={16}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
