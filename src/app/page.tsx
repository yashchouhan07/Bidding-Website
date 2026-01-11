import HeroSection from '@/components/home/hero-section';
import CategoriesSection from '@/components/home/categories-section';
import FeaturedProductsSection from '@/components/home/featured-products-section';
import HowItWorksSection from '@/components/home/how-it-works-section';
import CtaSection from '@/components/home/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
