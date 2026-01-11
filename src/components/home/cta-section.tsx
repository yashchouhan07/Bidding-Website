import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Start Bidding?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join our community of collectors and find your next treasure. Create a free account today.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/signup">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
