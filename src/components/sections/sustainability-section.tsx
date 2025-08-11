"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function SustainabilitySection() {
  const { t } = useLanguage();

  return (
    <section id="sustainability" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://placehold.co/600x450.png"
              data-ai-hint="farmer hands coffee cherries"
              alt="Close-up of a farmer's hands holding fresh coffee cherries, representing partnership and care."
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold uppercase tracking-wider text-accent">{t.sustainability.title}</span>
            <h2 className="mt-2 font-headline text-3xl font-bold tracking-tight md:text-4xl">{t.sustainability.headline}</h2>
            <p className="mt-4 text-lg text-foreground/80">
              {t.sustainability.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
