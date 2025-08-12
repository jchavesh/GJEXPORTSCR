import Header from '@/components/header';
import HeroSection from '@/components/sections/hero-section';
import ValuePropsSection from '@/components/sections/value-props-section';
import ProductsSection from '@/components/sections/products-section';
import ProcessSection from '@/components/sections/process-section';
import SustainabilitySection from '@/components/sections/sustainability-section';
import CertificationsSection from '@/components/sections/certifications-section';
import SocialProofSection from '@/components/sections/social-proof-section';
import FaqSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/footer';
import { AnimationWrapper } from '@/components/animation-wrapper';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AnimationWrapper>
          <ValuePropsSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <ProductsSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <ProcessSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <SustainabilitySection />
        </AnimationWrapper>
        <AnimationWrapper>
          <CertificationsSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <SocialProofSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <FaqSection />
        </AnimationWrapper>
        <AnimationWrapper>
          <ContactSection />
        </AnimationWrapper>
      </main>
      <Footer />
    </div>
  );
}
