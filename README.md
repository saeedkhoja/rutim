# RUTIM — Instagram target uchun landing (React + Vite)

Do‘kon va biznes egalariga taklif: stabilizatorlar sotuvdan keyin to‘lov, nasiya yoki ulgurji asosida.
Saytning bitta maqsadi — tashrif buyuruvchi **ariza qoldirsin**. Sayt ikki tilda: UZ va RU.

Sahifa tartibi: Taklif (hero) → Hamkorlik turlari → Mahsulotlar → Kimga foydali → 3 qadam → Ariza.
Har bir "Ariza qoldirish" tugmasi bitta formani ochadi: ism, telefon, do‘kon nomi, shahar/viloyat, hamkorlik turi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tayyor sayt dist/ papkasiga yig‘iladi
```

Lokal rejimda bot sozlanmagan bo‘lsa, arizalar `leads.local.jsonl` fayliga yoziladi (formani sinash uchun).

## Sozlash — `.env`

`.env.example` faylini `.env` nomi bilan nusxalang:

| O‘zgaruvchi | Nima uchun |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Arizalar menejerlar chatiga shu bot orqali keladi (@BotFather) |
| `TELEGRAM_CHAT_ID` | Arizalar keladigan chat yoki guruh ID |
| `VITE_LEAD_ENDPOINT` | Arizani backend orqali yuborish: `https://<backend>/leads/rutim` (ixtiyoriy; bo‘sh bo‘lsa `/api/lead`) |
| `VITE_PHONE` | Saytda ko‘rsatiladigan telefon (ixtiyoriy) |
| `VITE_META_PIXEL_ID` | Instagram reklamasi uchun Meta Pixel — ariza yuborilganda `Lead` hodisasi (ixtiyoriy) |

Reklama havolasiga UTM qo‘shsangiz (`?utm_source=instagram&utm_campaign=...`), u arizada ko‘rinadi.

## Deploy

- **Vercel** — loyihani import qiling va env o‘zgaruvchilarni qo‘shing. `api/lead.js` avtomatik serverless funksiya bo‘lib ishlaydi.
- **Boshqa hosting** — `dist/` papkasini joylang. `POST /api/lead` uchun `server/lead.js` dagi `handleLead` funksiyasini ishlating.

## Tuzilma

- `src/i18n.jsx` — barcha matnlar (UZ/RU)
- `src/config.js` — telefon, Pixel, kompaniya ma’lumotlari
- `src/components/LeadModal.jsx` — ariza formasi
- `src/data/cities.js` — shahar/viloyat ro‘yxati
- `data/products.json` — 18 ta mahsulot (narxlarsiz)
- `public/products/` — optimallashtirilgan rasmlar (`assets/products/` — asl nusxalar)
