// Kontakt va biznes sozlamalari — shu yerni o‘zgartiring.
export const CONFIG = {
  // Telegram username (@ belgisisiz). Arizalar va "Telegram’da yozish" tugmasi shu akkauntga ochiladi.
  telegramUsername: import.meta.env.VITE_TELEGRAM_USERNAME || 'rutim_b2b',
  // Telefon raqam (bo‘sh qoldirilsa saytda ko‘rsatilmaydi). Masalan: '+998 90 123 45 67'
  phone: import.meta.env.VITE_PHONE || '',
  uzumShop: 'https://uzum.uz/uz/shop/rutim1',
  company: '“INNOVATION TEXNO SERVICE” MCHJ',
  inn: '305616613',
  // Ism/telefon formasi shu endpointga yuboriladi (api/lead.js → Telegram bot).
  leadEndpoint: '/api/lead',
}

export const telegramLink = (text) =>
  `https://t.me/${CONFIG.telegramUsername}` + (text ? `?text=${encodeURIComponent(text)}` : '')

export const phoneHref = () => 'tel:' + CONFIG.phone.replace(/[^\d+]/g, '')
