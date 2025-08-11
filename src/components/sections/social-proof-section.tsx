"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/language-context";
import Image from "next/image";

const testimonials = [
  {
    name: "John Roaster",
    title: "Head Buyer, The Coffee Collective",
    quote: "J&G's Tarrazú honey-processed coffee is a consistent bestseller. Their quality control and reliable logistics are second to none.",
    avatar: "JR",
    avatarImage: "https://source.unsplash.com/40x40/?portrait,man"
  },
  {
    name: "Maria Flora",
    title: "Owner, Flora Imports EU",
    quote: "The ornamental plants always arrive in perfect condition. The phytosanitary documentation is flawless, making customs a breeze.",
    avatar: "MF",
    avatarImage: "https://source.unsplash.com/40x40/?portrait,woman"
  },
  {
    name: "David Chocolatier",
    title: "Founder, Artisan Cacao",
    quote: "The fine aroma cacao from J&G has transformed our bean-to-bar products. Their sourcing transparency is exactly what we look for in a partner.",
    avatar: "DC",
    avatarImage: "https://source.unsplash.com/40x40/?portrait,person"
  },
];

const clientLogos = [
  { name: "Client A", logo: "https://source.unsplash.com/150x60/?logo,gourmet", hint: "gourmet food" },
  { name: "Client B", logo: "https://source.unsplash.com/150x60/?logo,coffee-roaster", hint: "coffee roaster" },
  { name: "Client C", logo: "https://source.unsplash.com/150x60/?logo,chocolate", hint: "artisan chocolate" },
  { name: "Client D", logo: "https://source.unsplash.com/150x60/?logo,plant-distributor", hint: "plant distributor" },
  { name: "Client E", logo: "https://source.unsplash.com/150x60/?logo,import-export", hint: "import company" },
  { name: "Client F", logo: "https://source.unsplash.com/150x60/?logo,luxury-brand", hint: "luxury brand" },
];

const Marquee = () => {
    const logos = [...clientLogos, ...clientLogos]; // Duplicate for seamless loop
    return (
      <div className="relative mt-16 w-full overflow-hidden">
        <div className="flex animate-marquee">
          {logos.map((logo, index) => (
            <div key={index} className="mx-8 flex-shrink-0">
              <Image src={logo.logo} alt={logo.name} data-ai-hint={logo.hint} width={150} height={60} className="object-contain grayscale opacity-60" />
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default function SocialProofSection() {
  const { t } = useLanguage();

  return (
    <section id="social-proof" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{t.socialProof.title}</h2>
        </div>
        
        <Carousel className="mx-auto mt-12 w-full max-w-4xl">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0 bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-lg italic text-foreground/90">"{testimonial.quote}"</p>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatarImage} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-foreground/70">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-50px] hidden sm:flex" />
          <CarouselNext className="right-[-50px] hidden sm:flex" />
        </Carousel>

        <Marquee />

      </div>
    </section>
  );
}
