"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const certifications = [
  { name: 'ICAFE', logo: 'https://source.unsplash.com/150x80/?logo,badge', hint: 'ICAFE logo' },
  { name: 'Fair Trade', logo: 'https://source.unsplash.com/150x80/?logo,certificate', hint: 'fair trade' },
  { name: 'USDA Organic', logo: 'https://source.unsplash.com/150x80/?logo,organic', hint: 'USDA organic' },
  { name: 'Phytosanitary Certified', logo: 'https://source.unsplash.com/150x80/?logo,stamp', hint: 'phytosanitary certificate' },
  { name: 'Rainforest Alliance', logo: 'https://source.unsplash.com/150x80/?logo,nature', hint: 'rainforest alliance' },
];

export default function CertificationsSection() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="section-padding bg-background/50">
      <div className="container mx-auto px-4 text-center md:px-6">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{t.certifications.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
          {t.certifications.description}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {certifications.map((cert) => (
            <div key={cert.name} className="relative h-20 w-36 grayscale transition-all duration-300 hover:grayscale-0">
              <Image
                src={cert.logo}
                alt={`${cert.name} certification logo`}
                data-ai-hint={cert.hint}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
