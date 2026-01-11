import type { Category, Product } from '@/lib/types';
import { placeholderImages } from './placeholder-images';
import { Camera, Shirt, Gem, Home, Car, Shapes, Palette, Trophy } from 'lucide-react';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: Camera },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'art', name: 'Art', icon: Palette },
  { id: 'collectibles', name: 'Collectibles', icon: Gem },
  { id: 'home-garden', name: 'Home & Garden', icon: Home },
  { id: 'vehicles', name: 'Vehicles', icon: Car },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'other', name: 'Other', icon: Shapes },
];

export const products: Product[] = [
  {
    id: 'vintage-film-camera',
    name: 'Vintage Film Camera',
    description: 'A classic 1955 Leica M3 rangefinder camera in excellent working condition. A true collector\'s item.',
    category: 'electronics',
    startBid: 100,
    currentBid: 125,
    bidHistory: [
      { user: 'PhotoFan', amount: 110, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { user: 'Collector', amount: 125, timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1 + 1000 * 60 * 60 * 23), // ~2 days
    images: [placeholderImages.productVintageCamera1.imageUrl],
    value: 300,
  },
  {
    id: 'abstract-canvas-dimensions',
    name: 'Abstract Canvas "Dimensions"',
    description: 'A vibrant, large-scale abstract painting by a renowned contemporary artist. Mixed media on canvas.',
    category: 'art',
    startBid: 200,
    currentBid: 350,
    bidHistory: [
        { user: 'ArtLover', amount: 350, timestamp: new Date(Date.now() - 1000 * 60 * 45) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 23), // ~5 days
    images: [placeholderImages.productAbstractPainting1.imageUrl],
    value: 500,
  },
  {
    id: 'luxury-chronograph-watch',
    name: 'Luxury Chronograph Watch',
    description: 'A sophisticated chronograph watch from a world-renowned brand, featuring a stainless steel case and sapphire crystal.',
    category: 'collectibles',
    startBid: 800,
    currentBid: 1150,
    bidHistory: [
      { user: 'WatchAficionado', amount: 1000, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
      { user: 'TimeKeeper', amount: 1150, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 23), // ~7 days
    images: [placeholderImages.productLuxuryWatch.imageUrl],
    value: 2000,
  },
  {
    id: 'limited-edition-galaxy-sneakers',
    name: 'Limited Edition "Galaxy" Sneakers',
    description: 'Rare, limited edition sneakers with a unique "Galaxy" colorway. A must-have for any sneakerhead.',
    category: 'fashion',
    startBid: 400,
    currentBid: 620,
    bidHistory: [
      { user: 'SneakerHead', amount: 500, timestamp: new Date(Date.now() - 1000 * 60 * 20) },
      { user: 'HypeBeast', amount: 620, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 23), // 23 hours
    images: [placeholderImages.productGalaxySneakers.imageUrl],
    value: 800,
  },
  {
    id: 'antique-wooden-chair',
    name: 'Antique Wooden Chair',
    description: 'A beautifully crafted antique wooden chair, perfect for adding a touch of vintage charm to your home.',
    category: 'home-garden',
    startBid: 50,
    currentBid: 75,
    bidHistory: [
      { user: 'Decorator', amount: 65, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    images: [placeholderImages.productAntiqueChair.imageUrl],
    value: 150,
  },
  {
    id: 'rare-book-collection',
    name: 'Rare Book Collection',
    description: 'A collection of rare, first-edition books from various acclaimed authors. A treasure for any bibliophile.',
    category: 'other',
    startBid: 300,
    currentBid: 450,
    bidHistory: [],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days
    images: [placeholderImages.productBookCollection.imageUrl],
    value: 700,
  },
  {
    id: 'electric-guitar',
    name: 'Vintage Electric Guitar',
    description: 'A vintage electric guitar with a classic tone. Perfect for collectors and musicians alike.',
    category: 'sports',
    startBid: 600,
    currentBid: 800,
    bidHistory: [
        { user: 'GuitarHero', amount: 750, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    ],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9), // 9 days
    images: [placeholderImages.productElectricGuitar.imageUrl],
    value: 1200,
  },
  {
    id: 'designer-leather-bag',
    name: 'Designer Leather Bag',
    description: 'A stylish and elegant designer leather bag, perfect for any occasion. Comes with original dust bag.',
    category: 'fashion',
    startBid: 250,
    currentBid: 320,
    bidHistory: [],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
    images: [placeholderImages.productDesignerHandbag1.imageUrl],
    value: 500,
  },
];
