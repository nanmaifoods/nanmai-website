import type { Metadata } from 'next';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';

export const metadata: Metadata = {
  title: 'Product Details',
  description: 'View product details and add to cart.',
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
