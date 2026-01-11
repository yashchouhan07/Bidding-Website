'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import { formatDistanceStrict, format } from 'date-fns';
import { Badge } from './ui/badge';

type ProductCardProps = {
  product: Product;
};

const Countdown = ({ endDate }: { endDate: Date }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const end = new Date(endDate);
        if (end <= now) {
            return 'Auction ended';
        }

        const distance = formatDistanceStrict(end, now);
        
        // Simplified formatting logic
        const parts = distance.split(' ');
        if (parts.includes('days') || parts.includes('day')) {
             return format(end, 'dd MMM');
        }
        if (parts.includes('hours') || parts.includes('hour') || parts.includes('minutes') || parts.includes('minute') || parts.includes('seconds') || parts.includes('second')) {
            const days = Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const hours = Math.floor(((end.getTime() - now.getTime()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor(((end.getTime() - now.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor(((end.getTime() - now.getTime()) % (1000 * 60)) / 1000);
            
            let result = '';
            if (days > 0) result += `${days}d `;
            result += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            return result;
        }

        return distance;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return <span>{timeLeft}</span>;
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <Card className="flex flex-col h-full bg-card overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 border-0">
      <Link href={`/product/${product.id}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
      <CardContent className="p-4 bg-background rounded-b-lg flex-grow flex flex-col">
        <h3 className="text-lg font-semibold leading-tight truncate text-foreground mb-2">
            {product.name}
        </h3>
        <Badge variant="secondary" className="capitalize w-fit mb-4">{product.category}</Badge>
        
        <div className="mt-auto flex justify-between items-end text-sm">
          <div>
            <p className="text-muted-foreground">Current Bid</p>
            <p className="font-bold text-lg text-primary">
              ${product.currentBid.toLocaleString()}
            </p>
          </div>
          <div className="text-muted-foreground tabular-nums">
             <Countdown endDate={product.endDate} />
          </div>
        </div>
      </CardContent>
      </Link>
    </Card>
  );
}
