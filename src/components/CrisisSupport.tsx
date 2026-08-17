import { ExternalLink, PhoneCall, Shield } from 'lucide-react';

export function CrisisSupport() {
  return (
    <aside className="crisis-card mb-6 p-5 sm:p-6" aria-labelledby="crisis-title">
      <div className="flex items-start gap-4">
        <div className="crisis-icon" aria-hidden="true">
          <Shield className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 id="crisis-title" className="text-lg font-extrabold">
            سلامتك وصحتك النفسية هي الأهم الآن
          </h2>
          <p className="mt-2 text-sm font-medium leading-7">
            إذا كنت في خطر مباشر أو تشعر بحاجة للمساعدة، يرجى الاتصال بخدمات الطوارئ والاستشارة النفسية الفورية في بلدك. الأدعية هنا سند روحي، وليست بديلًا عن الرعاية الطبية والنفسية المتخصصة.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 font-bold">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <span>السعودية (استشارات): 937</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 font-bold">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <span>مصر (الأمان النفسي): 16453</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1.5 font-bold">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <span>الإمارات (الدعم النفسي): 8004673</span>
            </span>
          </div>

          <a
            href="https://www.who.int/news-room/questions-and-answers/item/suicide"
            target="_blank"
            rel="noopener noreferrer"
            className="crisis-link mt-4 inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>إرشادات طلب المساعدة من منظمة الصحة العالمية</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
