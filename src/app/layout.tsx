import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'J&G Exports - Costa Rican Coffee, Plants & Cacao',
  description:
    'Your trusted export partner for premium, specialty Costa Rican coffee, ornamental plants, and cacao. We offer certified quality and reliable global logistics.',
  openGraph: {
    title: 'J&G Exports - Costa Rican Coffee, Plants & Cacao',
    description:
      'Your trusted export partner for premium, specialty Costa Rican coffee, ornamental plants, and cacao. We offer certified quality and reliable global logistics.',
    url: 'https://jandgexports.com',
    siteName: 'J&G Exports',
    images: [
      {
        url: 'https://source.unsplash.com/1200x630/?coffee,costa-rica',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')} suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
