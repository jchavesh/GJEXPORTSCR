"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold">J&G Exports</span>
            </Link>
            <p className="text-sm text-background/70">{t.hero.subheadline.substring(0, 100)}...</p>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-primary">Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#products" className="hover:text-primary transition-colors">{t.nav.products}</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">{t.nav.process}</a></li>
              <li><a href="#sustainability" className="hover:text-primary transition-colors">{t.nav.sustainability}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
           <div>
            <h3 className="font-bold uppercase tracking-wider text-primary">{t.contact.info.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li>{t.contact.info.address}</li>
                <li>info@jgexportscr.com</li>
                <li>+506 6133 0225</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-wider text-primary">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} aria-label={link.name} className="text-background/80 hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                     {/* Placeholder icon path */}
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
