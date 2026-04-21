import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import BackToTop from '@/components/layout/BackToTop';

export const metadata: Metadata = {
  title: {
    default: 'Himalayan View Adventure – Treks & Expeditions in Uttarakhand',
    template: '%s | Himalayan View Adventure',
  },
  description:
    'Himalayan View Adventure offers expert-guided treks and expeditions in Uttarakhand, India. Kedarkantha, Valley of Flowers, Roopkund, Har Ki Dun & more. IMF certified guides. Book now!',
  keywords: [
    'Himalayan treks',
    'Uttarakhand trekking',
    'Kedarkantha Trek',
    'Valley of Flowers',
    'Roopkund Trek',
    'Har Ki Dun',
    'Brahmatal Trek',
    'Pangarchulla Peak',
    'Uttarkashi adventures',
    'Garhwal Himalaya',
    'trekking company India',
  ],
  authors: [{ name: 'Himalayan View Adventure' }],
  creator: 'Himalayan View Adventure',
  metadataBase: new URL('https://himalayanviewadventure.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://himalayanviewadventure.com',
    siteName: 'Himalayan View Adventure',
    title: 'Himalayan View Adventure – Treks & Expeditions in Uttarakhand',
    description:
      'Expert-guided Himalayan treks from Uttarkashi. Kedarkantha, Valley of Flowers, Roopkund & more. IMF certified guides. Small groups. Eco-friendly.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Himalayan View Adventure – Trek in the Himalayas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himalayan View Adventure',
    description: 'Expert-guided Himalayan treks from Uttarkashi, Uttarakhand.',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-snow text-charcoal-dark font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
