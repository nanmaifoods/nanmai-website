import type { Metadata } from 'next';
import { ProductsClientPage } from '@/components/products/ProductsClientPage';

export const metadata: Metadata = {
  title: 'Products – Shop All Appalams',
  description: 'Browse our full range of premium appalams – Classic, Garlic, Pepper, Cumin and more. Shop online with fast delivery.',
};

export default function ProductsPage() {
  return <ProductsClientPage />;
}
