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
    avatarImage: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Maria Flora",
    title: "Owner, Flora Imports EU",
    quote: "The ornamental plants always arrive in perfect condition. The phytosanitary documentation is flawless, making customs a breeze.",
    avatar: "MF",
    avatarImage: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "David Chocolatier",
    title: "Founder, Artisan Cacao",
    quote: "The fine aroma cacao from J&G has transformed our bean-to-bar products. Their sourcing transparency is exactly what we look for in a partner.",
    avatar: "DC",
    avatarImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

const clientLogos = [
  { name: "Client A", logo: "https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "gourmet food" },
  { name: "Client B", logo: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "coffee roaster" },
  { name: "Client C", logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "artisan chocolate" },
  { name: "Client D", logo: "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "plant distributor" },
  { name: "Client E", logo: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "import company" },
  { name: "Client F", logo: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "luxury brand" },
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
                          <AvatarImage src={testimonial.avatarImage} alt={`Avatar of ${testimonial.name}`} />
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
