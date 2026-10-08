// ============================================================================
// RUTIM — barcha sozlamalar va to‘ldirilishi kerak bo‘lgan joylar SHU FAYLDA.
// Komponentlarga tegmasdan shu yerni o‘zgartiring.
// Bo‘sh qoldirilgan qiymat saytda ko‘rinmaydi (yoki "so‘rov bo‘yicha" deb chiqadi).
// ============================================================================

export const CONFIG = {
  // Telefon raqam. Masalan: '+998 90 123 45 67' (yoki .env dagi VITE_PHONE)
  phone: import.meta.env.VITE_PHONE || '',
  // Telegram havola. Masalan: 'https://t.me/rutim_sales'. Bo‘sh bo‘lsa "Telegram orqali yozish" tugmasi chiqmaydi.
  telegramLink: '', // [TELEGRAM_LINK]

  // FAQ dagi qiymatlar. Bo‘sh bo‘lsa javob shu qismsiz chiqadi.
  minOrder: '', // [MIN_ORDER], masalan: '5 dona'
  deliveryTime: '', // [DELIVERY_TIME], masalan: '1–3 kun'
  warranty: '', // [WARRANTY], masalan: '12 oylik'

  // Meta Pixel ID: .env dagi PIXEL_ID (yoki eski nomi VITE_META_PIXEL_ID)
  metaPixelId: import.meta.env.PIXEL_ID || import.meta.env.VITE_META_PIXEL_ID || '',

  company: '“INNOVATION TEXNO SERVICE” MCHJ',
  inn: '305616613',
  // Ariza shu endpointga yuboriladi. Bo‘sh bo‘lsa — saytning o‘z api/lead.js funksiyasi (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID).
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT || '/api/lead',
}

// Kalkulyator narxlari (so‘mda, 1 dona uchun). 0 bo‘lsa — kalkulyatorda "Narxlar so‘rov bo‘yicha" chiqadi.
// dealerPrice — do‘konga sotiladigan diler narxi, retailPrice — tavsiya etilgan chakana narx.
export const PRICES = [
  { model: 'RRC95-500VA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-1000VA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-1500VA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-2000VA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-3000VA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-5KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-10KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-15KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-20KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC95-30KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC45-5KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC45-10KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC45-15KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC45-20KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RRC45-30KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RTC-15KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RTC-20KVA', dealerPrice: 0, retailPrice: 0 },
  { model: 'RTC-30KVA', dealerPrice: 0, retailPrice: 0 },
]

// Kalkulyatorda boshlang‘ich tanlangan model
export const CALC_DEFAULT_MODEL = 'RRC95-1000VA'

// Hamkor do‘konlar fikrlari. `quote` bo‘sh bo‘lgan karta ko‘rsatilmaydi;
// hammasi bo‘sh bo‘lsa — "Hamkor do‘konlar" bo‘limi umuman chiqmaydi.
// video — YouTube embed havolasi (ixtiyoriy), masalan: 'https://www.youtube.com/embed/XXXXXXXX'
export const TESTIMONIALS = [
  { name: '', city: '', shopType: '', quote: '', video: '' }, // [TESTIMONIAL_1]
  { name: '', city: '', shopType: '', quote: '', video: '' }, // [TESTIMONIAL_2]
  { name: '', city: '', shopType: '', quote: '', video: '' }, // [TESTIMONIAL_3]
]

export const phoneHref = () => 'tel:' + CONFIG.phone.replace(/[^\d+]/g, '')

// 1250000 → "1 250 000 so‘m"
export const som = (n) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so‘m`
