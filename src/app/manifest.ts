import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'أذكار وأدعية حسب شعورك',
    short_name: 'أذكار',
    description: 'أذكار وأدعية من القرآن والسنة مصنفة حسب الشعور.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBFAF8',
    theme_color: '#FEEB9C',
    lang: 'ar',
    dir: 'rtl',
  };
}
