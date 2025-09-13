import BackToTop from '@/components/BackToTop';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import Navigation from '@/components/Navigation';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'CineMalt – Crafting Stories on Screen',
  description: 'CineMalt is a film production company crafting cinematic stories that turn ideas into iconic brands.',
  openGraph: {
    title: 'CineMalt – Crafting Stories on Screen',
    description: 'A film production company creating impactful cinema.',
    url: 'https://cinemalt.com',
    siteName: 'CineMalt',
    images: [
      {
        url: 'https://cdn.cinemalt.com/logo/icon.jpg',
        width: 1200,
        height: 630,
        alt: 'CineMalt – Crafting Stories on Screen',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineMalt – Crafting Stories on Screen',
    description: 'A film production company creating impactful cinema.',
    images: ['https://cdn.cinemalt.com/logo/icon.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorant.variable} font-poppins bg-black text-black overflow-x-hidden`}>
        <Navigation />
        {children}
        <BackToTop />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CineMalt",
              "url": "https://cinemalt.com",
              "logo": "https://cdn.cinemalt.com/logo/icon.jpg",
              "description": "Crafting Stories on Screen",
            }),
          }}
        />
      </body>
    </html>
  );
}
