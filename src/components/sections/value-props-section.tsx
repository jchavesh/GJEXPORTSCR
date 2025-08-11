"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, PackageCheck, Ship, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const icons = [Award, Ship, PackageCheck, Users];

export default function ValuePropsSection() {
  const { t } = useLanguage();

  return (
    <section id="value-props" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            {t.valueProps.title}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.valueProps.props.map((prop, index) => {
            const Icon = icons[index];
            return (
              <Card key={prop.title} className="transform border-2 border-transparent bg-card text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">{prop.title}</CardTitle>
                  <CardDescription className="pt-2 text-foreground/80">{prop.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
