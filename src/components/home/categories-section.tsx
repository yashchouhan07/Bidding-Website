import Link from 'next/link';
import { categories } from '@/lib/data';
import type { Category } from '@/lib/types';
import { Card } from '@/components/ui/card';

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Browse Categories</h2>
          <p className="mt-2 text-lg text-muted-foreground">Explore our curated collection of premium items</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {(categories as Category[]).map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="group block">
              <Card className="overflow-hidden relative aspect-square flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg border-border/50 bg-card/50 hover:bg-card">
                <div className="mb-4 bg-primary/20 text-primary p-4 rounded-full">
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="relative text-lg font-semibold text-foreground z-10">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
