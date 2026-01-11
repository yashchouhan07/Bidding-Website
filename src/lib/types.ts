export type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Product = {
  id: string;
  name:string;
  description: string;
  category: string;
  startBid: number;
  currentBid: number;
  bidHistory: Bid[];
  endDate: Date;
  images: string[];
  value: number; // For AI tool
};

export type Bid = {
  user: string;
  amount: number;
  timestamp: Date;
};

export type HowItWorksStep = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};
