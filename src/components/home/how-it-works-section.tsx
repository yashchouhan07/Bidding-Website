import type { HowItWorksStep } from '@/lib/types';
import { UserPlus, Search, Hammer, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const howItWorksSteps: (HowItWorksStep & { href: string })[] = [
  { icon: UserPlus, title: 'Create Account', description: 'Sign up for free and start your bidding journey.', href: '/signup' },
  { icon: Search, title: 'Find Items', description: 'Browse through categories and discover unique items.', href: '/#featured' },
  { icon: Hammer, title: 'Place a Bid', description: 'Enter the auction and place your bid to win.', href: '/#featured' },
  { icon: Wallet, title: 'Win & Pay', description: 'Securely pay for your won item and arrange for delivery.', href: '/wallet' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">A simple, transparent, and exciting way to buy and sell unique items.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <Link key={index} href={step.href} className="group">
                <Card className="bg-card text-center flex flex-col items-center p-6 border-border/50 h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:bg-card/90">
                <div className="mb-4 bg-primary/10 p-4 rounded-full">
                    <step.icon className="h-10 w-10 text-primary" />
                </div>
                <CardHeader className="p-0">
                    <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                    <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
