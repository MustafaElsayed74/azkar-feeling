import type { Metadata, Viewport } from 'next';
import { Amiri, Cairo } from 'next/font/google';
import './globals.css';
import { MobileNav } from '@/components/MobileNav';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'أذكار وأدعية حسب شعورك | أدعية من القرآن والسنة',
  description: SITE_DESCRIPTION,
  keywords: ['أذكار', 'أدعية حسب الشعور', 'أدعية نبوية', 'أدعية من القرآن', 'حصن المسلم', 'دعاء الحزن', 'دعاء القلق', 'azkar feeling'],
  openGraph: {
    title: 'أذكار وأدعية حسب شعورك',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ar_SA',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أذكار وأدعية حسب شعورك',
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#FEEB9C',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body className="min-h-screen pb-20 antialiased md:pb-0">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
