"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ArrowRight, CheckCircle, Clock, Globe, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from 'react';

const Counter = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const end = to;
          if (start === end) return;

          const startTime = Date.now();
          const step = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}</span>;
};

const ParallaxBackground = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src="https://source.unsplash.com/1920x1080/?coffee-plantation,jungle"
        data-ai-hint="coffee plantation jungle"
        alt="A lush Costa Rican landscape with coffee plants and tropical foliage"
        fill
        className="object-cover"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
};


export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20 text-center text-foreground">
      <ParallaxBackground />
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 md:px-6">
        <h1 className="font-headline text-4xl font-bold !leading-tight tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {t.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-foreground/80 md:text-xl">
          {t.hero.subheadline}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              {t.nav.requestQuote} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="https://wa.me/50661330225" target="_blank" rel="noopener noreferrer">
             <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              {t.hero.whatsapp}
            </Button>
          </a>
        </div>
        <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <Clock className="h-8 w-8 text-primary" />
            <p className="text-3xl font-bold"><Counter to={1} />+</p>
            <p className="text-sm text-foreground/70">{t.hero.trustBadges.years}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <p className="text-3xl font-bold"><Counter to={99} />%</p>
            <p className="text-sm text-foreground/70">{t.hero.trustBadges.shipments}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <p className="text-3xl font-bold"><Counter to={2} />+</p>
            <p className="text-sm text-foreground/70">{t.hero.trustBadges.countries}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
