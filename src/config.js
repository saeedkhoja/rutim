// Kontakt va biznes sozlamalari — shu yerni o‘zgartiring.
export const CONFIG = {
  // Telefon raqam (bo‘sh qoldirilsa saytda ko‘rsatilmaydi). Masalan: '+998 90 123 45 67'
  phone: import.meta.env.VITE_PHONE || '',
  // Meta (Instagram/Facebook) Pixel ID — reklama konversiyalarini kuzatish uchun (ixtiyoriy).
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  company: '“INNOVATION TEXNO SERVICE” MCHJ',
  inn: '305616613',
  // Ariza formasi shu endpointga yuboriladi. Bo‘sh bo‘lsa — saytning o‘z api/lead.js funksiyasi;
  // backend orqali yuborish uchun VITE_LEAD_ENDPOINT ga backend manzilini yozing (…/leads/rutim).
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT || '/api/lead',
}

export const phoneHref = () => 'tel:' + CONFIG.phone.replace(/[^\d+]/g, '')
