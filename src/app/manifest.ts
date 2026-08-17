import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'مأوى — أذكار وأدعية حسب شعورك',
    short_name: 'مأوى',
    description: 'مأوى — أذكار وأدعية مستحبة من القرآن والسنة مصنفة حسب الشعور.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBFAF8',
    theme_color: '#FEEB9C',
    lang: 'ar',
    dir: 'rtl',
  };
}
