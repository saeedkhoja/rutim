# RUTIM — B2B landing (React + Vite)

Do‘konlar uchun B2B landing: stabilizatorlar shartnoma asosida beriladi (sotgandan keyin to‘lov, nasiya yoki ulgurji). Sayt ikki tilda ishlaydi: UZ va RU.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tayyor sayt dist/ papkasiga yig‘iladi
```

## Sozlash — `.env`

`.env.example` faylini `.env` nomi bilan nusxalang:

| O‘zgaruvchi | Nima uchun |
|---|---|
| `VITE_TELEGRAM_USERNAME` | "Telegram’da yozish" tugmalari ochadigan akkaunt (@ belgisisiz) |
| `VITE_PHONE` | Saytda ko‘rsatiladigan telefon (ixtiyoriy) |
| `TELEGRAM_BOT_TOKEN` | Ariza formasi yuboradigan bot (@BotFather orqali yaratiladi) |
| `TELEGRAM_CHAT_ID` | Arizalar keladigan chat yoki guruh ID |

Bot sozlanmagan bo‘lsa ham forma ishlaydi: mijozga tayyor matn bilan Telegram chatni ochish taklif qilinadi.

## Deploy

- **Vercel** — loyihani import qiling va env o‘zgaruvchilarni qo‘shing. `api/lead.js` avtomatik serverless funksiya bo‘lib ishlaydi.
- **Boshqa hosting** — `dist/` papkasini joylang. `POST /api/lead` uchun `server/lead.js` dagi `handleLead` funksiyasini ishlating.

## Tuzilma

- `src/i18n.jsx` — barcha matnlar (UZ/RU)
- `src/config.js` — kontaktlar va kompaniya ma’lumotlari
- `data/products.json` — Uzum’dan olingan 18 ta mahsulot (narxlarsiz)
- `src/data/products.js` — katalog, tayyor to‘plamlar, kalkulyator uchun ma’lumotlar
- `public/products/` — optimallashtirilgan rasmlar (`assets/products/` — asl nusxalar)
