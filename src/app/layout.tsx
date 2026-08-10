import type { Metadata } from 'next';
import './globals.css';
import { MobileNav } from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'أذكار وأدعية حسب شعورك | أدعية من القرآن والسنة',
  description: 'موسوعة إسلامية تفاعلية للأذكار والأدعية حسب حالتك النفسية والشعورية (حزين، قلق، غاضب، شاكر، وحيد، مكتئب، حائر وغيرها).',
  keywords: ['أذكار', 'أدعية حسب الشعور', 'أدعية نبوية', 'أدعية من القرآن', 'حصن المسلم', 'دعاء الحزن', 'دعاء القلق'],
  openGraph: {
    title: 'أذكار وأدعية حسب شعورك',
    description: 'اعثر على الدعاء أو الذكر المناسب لحالتك النفسية من السنة النبوية والقرآن الكريم.',
    type: 'website',
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
