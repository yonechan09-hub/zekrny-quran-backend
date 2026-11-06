# Backend ربط Zekrny بـ Quran Foundation

## التشغيل
1. ثبّت Node.js 20 أو أحدث.
2. انسخ `.env.example` إلى `.env.local`.
3. ضع Client ID وClient Secret في `.env.local` فقط. لا تضعهما في Android أو HTML ولا ترفع `.env.local` إلى Git.
4. اترك `QF_ENV=prelive` للاختبار. حسابات Pre-live الجديدة لا توفر إلا الفاتحة والبقرة حتى الموافقة على Production access.
5. شغّل `npm install` ثم `npm run dev`.
6. انشر المشروع على Vercel أو استضافة Node.js، ثم ضع رابط النشر مكان `YOUR-QF-BACKEND.vercel.app` في `index.html`.

## API routes
- `/api/quran/page/1` بيانات آيات صفحة.
- `/api/quran/ayah/1/1` رقم صفحة آية.
- `/api/quran/chapters` بيانات السور.

هذا Backend وسيط؛ الـClient Secret لا يخرج منه مطلقًا.
