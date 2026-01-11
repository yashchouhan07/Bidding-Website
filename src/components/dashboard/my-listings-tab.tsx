'use client';

import { Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MyListingsTab() {
  // This will be replaced with real listing data later
  const listings: any[] = [];

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed rounded-lg bg-card/50">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">You haven't listed any items yet</h2>
        <p className="text-muted-foreground mt-2 mb-4">Start selling and see your items here.</p>
        <Button asChild>
            <Link href="/add-product">List an Item</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* This is where the list of listings will go */}
    </div>
  );
}
