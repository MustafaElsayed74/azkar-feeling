import type { Metadata } from 'next';
import './globals.css';
import { MobileNav } from '@/components/MobileNav';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أذكار وأدعية حسب شعورك',
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-[#080d1a] text-slate-100 antialiased min-h-screen flex flex-col justify-between radial-bg pb-20 md:pb-0">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
