import { ExternalLink, Shield } from 'lucide-react';

export function CrisisSupport() {
  return (
    <aside className="crisis-card mb-6 p-5 sm:p-6" aria-labelledby="crisis-title">
      <div className="flex items-start gap-4">
        <div className="crisis-icon" aria-hidden="true">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h2 id="crisis-title" className="text-lg font-extrabold">
            سلامتك أهم الآن
          </h2>
          <p className="mt-2 text-sm font-medium leading-7">
            إذا كنت في خطر مباشر أو تخشى أن تؤذي نفسك، فاتصل بخدمات الطوارئ
            المحلية الآن، وابقَ مع شخص تثق به ولا تبقَ وحدك. الأدعية هنا دعم
            روحي، وليست بديلًا عن المساعدة الطبية أو النفسية العاجلة.
          </p>
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
