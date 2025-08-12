"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import { Bean, Leaf, Coffee, ArrowRight } from 'lucide-react';

const ProductCard = ({ icon: Icon, title, description, cta, images, ctaLink }: {
  icon: React.ElementType,
  title: string,
  description: string,
  cta: string,
  images: { src: string, hint: string }[],
  ctaLink: string
}) => (
  <Card className="overflow-hidden border-none bg-transparent shadow-none">
    <CardContent className="grid gap-8 p-0 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <Icon className="mb-4 h-10 w-10 text-primary" />
        <h3 className="font-headline text-2xl font-bold">{title}</h3>
        <p className="mt-4 text-base text-foreground/80">{description}</p>
        <a href={ctaLink}>
          <Button variant="link" className="mt-4 px-0 text-accent">
            {cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={index} className={`relative aspect-square ${index === 0 ? 'col-span-2' : ''}`}>
            <Image
              src={img.src}
              data-ai-hint={img.hint}
              alt={title}
              fill
              className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function ProductsSection() {
  const { t } = useLanguage();

  const products = [
    {
      id: "coffee",
      icon: Coffee,
      title: t.products.coffee.title,
      description: t.products.coffee.description,
      cta: t.products.coffee.cta,
      images: [
        { src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "specialty coffee roasting" },
        { src: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "coffee cherries" },
        { src: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "coffee farm" },
      ]
    },
    {
      id: "plants",
      icon: Leaf,
      title: t.products.plants.title,
      description: t.products.plants.description,
      cta: t.products.plants.cta,
      images: [
        { src: "https://images.unsplash.com/photo-1611645905259-7e023949b544?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "tropical houseplant" },
        { src: "https://images.unsplash.com/photo-1722233852087-1961a4405ff9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "plant greenhouse" },
        { src: "https://images.unsplash.com/photo-1723025956604-57b0253ad3b4?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "plant packaging" },
      ]
    },
    {
      id: "cacao",
      icon: Bean,
      title: t.products.cacao.title,
      description: t.products.cacao.description,
      cta: t.products.cacao.cta,
      images: [
        { src: "https://placehold.co/600x600.png", hint: "cacao pod" },
        { src: "https://placehold.co/300x300.png", hint: "cacao beans" },
        { src: "https://placehold.co/300x300.png", hint: "drying cacao" },
      ]
    },
  ];

  return (
    <section id="products" className="section-padding bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{t.products.title}</h2>
        </div>
        <Tabs defaultValue="coffee" className="mt-12 w-full">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="coffee"><Coffee className="mr-2 h-4 w-4" />{t.products.coffee.title}</TabsTrigger>
            <TabsTrigger value="plants"><Leaf className="mr-2 h-4 w-4" />{t.products.plants.title}</TabsTrigger>
            <TabsTrigger value="cacao"><Bean className="mr-2 h-4 w-4" />{t.products.cacao.title}</TabsTrigger>
          </TabsList>
          {products.map(product => (
            <TabsContent key={product.id} value={product.id} className="mt-8">
              <ProductCard {...product} ctaLink="#contact" />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
