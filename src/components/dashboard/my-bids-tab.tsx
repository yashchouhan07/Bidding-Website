'use client';

import { Gavel } from 'lucide-react';

export default function MyBidsTab() {
  // This will be replaced with real bid data later
  const bids: any[] = [];

  if (bids.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed rounded-lg bg-card/50">
        <Gavel className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">No bids yet</h2>
        <p className="text-muted-foreground mt-2">Start bidding on items to see them here</p>
      </div>
    );
  }

  return (
    <div>
      {/* This is where the list of bids will go */}
    </div>
  );
}
