"use client";

import { useLanguage } from "@/contexts/language-context";
import { Search, FlaskConical, FileText, Ship, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [Search, FlaskConical, FileText, Ship, CheckCircle];

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {t.process.title}
          </h2>
        </div>
        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" aria-hidden="true" />
          <div className="space-y-12 md:space-y-0">
            {t.process.steps.map((step, index) => {
              const Icon = icons[index];
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center md:justify-center">
                  <div className={cn(
                    "relative w-full rounded-lg border bg-card p-6 shadow-md md:w-5/12",
                    isEven ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
                  )}>
                    <div className={cn(
                      "absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground md:left-1/2 md:-translate-x-1/2",
                      isEven ? "left-6 md:right-auto" : "right-6 md:left-auto"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-headline text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-foreground/80">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
