import React from 'react';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer mt-16 py-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
        <div className="flex items-center gap-3">
          <div className="theme-icon-wrap h-8 w-8 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-sm font-extrabold">
              أذكار وأدعية حسب شعورك
            </span>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mt-0.5 flex items-center justify-center gap-1 text-[11px] font-bold hover:underline sm:justify-start"
            >
              <span>azkar-feeling.vercel.app</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <p className="theme-muted max-w-md text-xs font-medium">
          مستخرجة من كتاب الله وسنة رسوله ﷺ ومصنّفة حسب الحالات النفسية والوجدانية.
        </p>

        <div className="theme-muted flex items-center gap-1.5 text-xs font-bold">
          <span>صُنِع بـ</span>
          <Heart className="inline h-3.5 w-3.5 fill-current" />
          <span>لكل مسلم ومسلمة</span>
        </div>
      </div>
    </footer>
  );
};
