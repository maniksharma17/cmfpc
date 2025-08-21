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
  title: 'CineMalt - Film Production Company',
  description: 'We distill stories and deliver cinematic production that turns ideas into iconic brands.',
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
        
      </body>
    </html>
  );
}