import type { Metadata } from 'next';
import { BookmarksClient } from '@/components/BookmarksClient';

export const metadata: Metadata = {
  title: 'الأدعية والأذكار المحفوظة',
  description: 'مجموعة الأدعية والأذكار التي حفظتها على هذا الجهاز.',
  alternates: {
    canonical: '/bookmarks',
  },
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
