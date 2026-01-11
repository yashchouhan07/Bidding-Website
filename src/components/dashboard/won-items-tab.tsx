'use client';

import { Trophy } from 'lucide-react';

export default function WonItemsTab() {
  // This will be replaced with real won items data later
  const wonItems: any[] = [];

  if (wonItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed rounded-lg bg-card/50">
        <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">No auctions won yet</h2>
        <p className="text-muted-foreground mt-2">Keep bidding to win your next treasure!</p>
      </div>
    );
  }

  return (
    <div>
      {/* This is where the list of won items will go */}
    </div>
  );
}
