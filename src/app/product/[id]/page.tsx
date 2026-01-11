'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from '@/components/countdown-timer';
import BiddingTool from '@/components/bidding-tool';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Product, Bid } from '@/lib/types';
import { User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | undefined>(products.find((p) => p.id === params.id));
  const [bidAmount, setBidAmount] = useState<number | string>('');
  const { toast } = useToast();


  useEffect(() => {
    setProduct(products.find((p) => p.id === params.id));
  }, [params.id]);


  if (!product) {
    return notFound();
  }

  const timeRemaining = new Date(product.endDate).getTime() - new Date().getTime();
  
  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBidAmount = Number(bidAmount);
    if (!newBidAmount || newBidAmount <= product.currentBid) {
      toast({
        variant: "destructive",
        title: "Invalid Bid",
        description: `Your bid must be higher than the current bid of $${product.currentBid.toLocaleString()}.`,
      });
      return;
    }

    const newBid: Bid = {
      user: 'You', // This would be the authenticated user in a real app
      amount: newBidAmount,
      timestamp: new Date(),
    };

    setProduct(prevProduct => {
      if (!prevProduct) return;
      return {
        ...prevProduct,
        currentBid: newBidAmount,
        bidHistory: [newBid, ...prevProduct.bidHistory],
      }
    });

    setBidAmount('');

    toast({
      title: "Bid Placed Successfully!",
      description: `Your bid of $${newBidAmount.toLocaleString()} has been placed.`,
    });
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3]">
                        <Image
                            src={img}
                            alt={`${product.name} image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            data-ai-hint="product image"
                        />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <Badge variant="secondary" className="mb-2 capitalize">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Seller: {product.bidHistory[product.bidHistory.length-1]?.user || 'Starting Bid'}</span>
            </div>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          </div>

          <div className='space-y-4'>
            <h2 className="text-2xl font-bold">Auction Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">Current Bid</p>
                        <p className="text-3xl font-bold text-primary">${product.currentBid.toLocaleString()}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">Bids</p>
                        <p className="text-3xl font-bold">{product.bidHistory.length}</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardContent className="p-4 flex flex-col items-center gap-2">
                     <p className="text-sm text-muted-foreground">Auction Ends In</p>
                    <CountdownTimer endDate={product.endDate} />
                </CardContent>
            </Card>
          </div>
          
          <div className='space-y-4'>
            <h2 className="text-2xl font-bold">Your Bid</h2>
            <Card>
                <CardContent className="pt-6">
                     <form onSubmit={handleBidSubmit} className="flex gap-2">
                        <Label htmlFor="bid-amount" className="sr-only">Bid amount</Label>
                        <Input 
                          id="bid-amount" 
                          type="number" 
                          placeholder={`$${(product.currentBid + 1).toLocaleString()} or more`}
                          className="text-base"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          required
                          min={product.currentBid + 1}
                        />
                        <Button type="submit" className="px-8 text-base font-bold">Place Bid</Button>
                    </form>
                </CardContent>
            </Card>
          </div>

          <BiddingTool 
            currentBid={product.currentBid}
            productValue={product.value}
            timeRemaining={timeRemaining > 0 ? timeRemaining / 1000 : 0}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
              <CardDescription>See the latest bidding activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[...product.bidHistory].map((bid, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{bid.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{bid.user}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(bid.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-lg">${bid.amount.toLocaleString()}</p>
                  </li>
                ))}
                {product.bidHistory.length === 0 && <p className="text-muted-foreground text-center py-4">No bids yet. Be the first!</p>}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
