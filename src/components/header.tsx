"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

const Logo = () => (
  <Link href="/" className="flex items-center gap-2" aria-label="J&G Exports Home">
    <Globe className="h-8 w-8 text-primary" />
    <span className="font-headline text-xl font-bold tracking-tight text-foreground">
      J&G Exports
    </span>
  </Link>
);

const navLinks = [
  { id: 'products', name: 'products' },
  { id: 'process', name: 'process' },
  { id: 'ai-tool', name: 'aiTool' },
  { id: 'sustainability', name: 'sustainability' },
  { id: 'certifications', name: 'certifications' },
  { id: 'faq', name: 'faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navLinks.map(link => document.getElementById(link.id));
      let currentSection = '';
      
      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
            activeSection === link.id ? 'text-primary font-bold' : 'text-foreground/80'
          )}
        >
          {t.nav[link.name as keyof typeof t.nav]}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-2 md:flex">
          <NavItems />
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
          >
            <span className="text-sm font-bold">{lang === 'en' ? 'ES' : 'EN'}</span>
          </Button>
          <a href="#contact">
            <Button className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
              {t.nav.requestQuote}
            </Button>
          </a>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                     <Logo />
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="mt-8 flex flex-col gap-4">
                    <NavItems />
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{t.nav.requestQuote}</Button>
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
