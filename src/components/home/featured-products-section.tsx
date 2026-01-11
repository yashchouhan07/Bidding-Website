import Link from 'next/link';
import { products } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product-card';

export default function FeaturedProductsSection() {
  const featuredProducts = products.slice(0, 8);
  return (
    <section id="featured" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Live Auctions</h2>
              <p className="mt-2 text-lg text-muted-foreground">Ending soon - don't miss out!</p>
            </div>
            <Link href="/products" className="text-primary hover:text-primary/80 flex items-center gap-2">
                View All <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
