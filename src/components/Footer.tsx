import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-10 mt-16 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm font-black text-slate-200">
            أذكار وأدعية حسب شعورك
          </span>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          مستخرجة من كتاب الله وسنة رسوله ﷺ ومصنّفة حسب الحالات النفسية والوجدانية.
        </p>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
          <span>صُنِع بـ</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>لكل مسلم ومسلمة</span>
        </div>
      </div>
    </footer>
  );
};
