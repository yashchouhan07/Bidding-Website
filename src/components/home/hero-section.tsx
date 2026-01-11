import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const stats = [
    { value: '10K+', label: 'Active Auctions' },
    { value: '50K+', label: 'Happy Bidders' },
    { value: '$5M+', label: 'Items Sold' },
    { value: '99%', label: 'Satisfaction' },
];


export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center text-left text-white py-20 md:py-32">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-10 p-4">
            <Badge variant="default" className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Live Auctions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter !font-headline">
                Bid on <span className="text-primary">Extraordinary</span> Items
            </h1>
            <p className="mt-4 max-w-xl text-lg md:text-xl text-neutral-300">
            Discover rare collectibles, luxury goods, and unique treasures. Join thousands of collectors in live auctions worldwide.
            </p>
            <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#featured">Start Bidding <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-primary/10">
                <Link href="/add-product">Sell an Item</Link>
            </Button>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                        <p className="text-4xl font-bold text-primary">{stat.value}</p>
                        <p className="text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
