"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const certifications = [
  { name: 'ICAFE', logo: 'https://www.icafe.cr/wp-content/uploads/2024/11/logo_icafe_header.png', hint: 'ICAFE logo' },
  { name: 'PROCOMER', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Logo_PROCOMER.png', hint: 'PROCOMER logo' },
  { name: 'Essential Costa Rica', logo: 'https://images.credly.com/images/fb44d8eb-3230-4d90-b533-c0c3b7391991/twitter_thumb_201604_image.png', hint: 'Essential Costa Rica brand logo' },
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
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
