# RUTIM — do‘konlar uchun diler landingi (React + Vite)

Do‘kon egalariga taklif: RUTIM stabilizatorlarini **diler narxida** oling, har bir sotuvdan foyda qiling,
60 kunlik almashtirish kafolati va bepul yetkazish. Saytning bitta maqsadi — tashrif buyuruvchi **ariza qoldirsin**.
Sayt faqat o‘zbek tilida (lotin).

Sahifa tartibi: Hero → RUTIM haqida (seriyalar) → Foyda kalkulyatori → 60 kunlik kafolat → Nega RUTIM →
Kotel/konditsioner → Katalog (18 model) → Hamkor do‘konlar → Savollar → Ariza formasi (`#lead`).
Barcha tugmalar `#lead` formasiga olib boradi; katalog va kalkulyator tugmalari modelni formaga oldindan qo‘yadi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tayyor sayt dist/ papkasiga yig‘iladi
```

Lokal rejimda bot sozlanmagan bo‘lsa, arizalar `leads.local.jsonl` fayliga yoziladi (formani sinash uchun).

## Narxlar, muddatlar, havolalar — `src/config.js`

Barcha to‘ldiriladigan joylar bitta faylda — komponentlarga tegish shart emas:

| Nima | Qayerda |
|---|---|
| Kalkulyator narxlari (18 model: `dealerPrice`, `retailPrice`) | `PRICES` — 0 bo‘lsa "Narxlar so‘rov bo‘yicha" chiqadi |
| Telegram havola | `CONFIG.telegramLink` — bo‘sh bo‘lsa tugma chiqmaydi |
| Minimal buyurtma / yetkazish muddati / kafolat | `CONFIG.minOrder`, `CONFIG.deliveryTime`, `CONFIG.warranty` (FAQ) |
| Telefon | `CONFIG.phone` yoki `.env` dagi `VITE_PHONE` |
| Hamkor do‘konlar fikrlari | `TESTIMONIALS` — `quote` bo‘sh bo‘lsa karta (hammasi bo‘sh bo‘lsa bo‘lim) chiqmaydi |

Matnlar — `src/copy.js`.

## Sozlash — `.env`

`.env.example` faylini `.env` nomi bilan nusxalang:

| O‘zgaruvchi | Nima uchun |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Arizalar menejerlar chatiga shu bot orqali keladi (@BotFather) |
| `TELEGRAM_CHAT_ID` | Arizalar keladigan chat yoki guruh ID |
| `PIXEL_ID` | Meta Pixel: `PageView` (ochilganda), `InitiateCheckout` (model narxi so‘ralganda), `Lead` (ariza yuborilganda) |
| `VITE_LEAD_ENDPOINT` | Arizani backend orqali yuborish: `https://<backend>/leads/rutim` (ixtiyoriy; bo‘sh bo‘lsa `/api/lead`) |
| `VITE_PHONE` | Saytda ko‘rsatiladigan telefon (ixtiyoriy) |

Reklama havolasiga UTM qo‘shsangiz (`?utm_source=instagram&utm_campaign=...`), ular sessionStorage’da saqlanadi
va arizada (sahifa manzili bilan birga) ko‘rinadi.

## Deploy

- **Vercel** — loyihani import qiling va env o‘zgaruvchilarni qo‘shing. `api/lead.js` avtomatik serverless funksiya bo‘lib ishlaydi.
- **Boshqa hosting** — `dist/` papkasini joylang. `POST /api/lead` uchun `server/lead.js` dagi `handleLead` funksiyasini ishlating.

## Tuzilma

- `src/config.js` — narxlar, FAQ qiymatlari, Telegram, telefon, fikrlar
- `src/copy.js` — barcha matnlar
- `src/components/` — bo‘limlar (`Hero`, `Calculator`, `Sections`, `Products`, `LeadForm` …)
- `server/lead.js` — arizani tekshirish va Telegram xabari
- `src/data/cities.js` — shahar/viloyat ro‘yxati
- `data/products.json` — 18 ta mahsulot (narxlarsiz)
- `public/products/` — optimallashtirilgan rasmlar (`assets/products/` — asl nusxalar)
