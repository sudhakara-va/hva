import Hero from '@/components/home/Hero';
import StatsBar from '@/components/home/StatsBar';
import FeaturedExpeditions from '@/components/home/FeaturedExpeditions';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import PhotoGrid from '@/components/home/PhotoGrid';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedExpeditions />
      <WhyChooseUs />
      <PhotoGrid />
      <TestimonialCarousel />
      <CTABanner />
    </>
  );
}
