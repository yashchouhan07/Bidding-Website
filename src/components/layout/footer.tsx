import Link from 'next/link';
import { Gavel, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-md">
                  <Gavel className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">Auction Hub</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              The premier online auction platform for unique items and collectibles.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/#featured" className="text-muted-foreground transition-colors hover:text-primary">Live Auctions</Link>
              <Link href="/#categories" className="text-muted-foreground transition-colors hover:text-primary">Categories</Link>
              <Link href="/#how-it-works" className="text-muted-foreground transition-colors hover:text-primary">How It Works</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">For Sellers</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Help Center</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">FAQs</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Contact Us</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Cookie Policy</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Buyer Protection</Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Seller Agreement</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Auction Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
