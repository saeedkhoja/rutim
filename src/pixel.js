// Meta Pixel (Instagram reklamasi uchun). PIXEL_ID berilmasa hech narsa qilmaydi.
// Hodisalar: PageView — ochilganda, InitiateCheckout — model/diler narxi so‘ralganda (katalog, kalkulyator), Lead — ariza yuborilganda.
import { CONFIG } from './config'

export function initPixel() {
  const id = CONFIG.metaPixelId
  if (!id || window.fbq) return
  const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments) }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = window._fbq = fbq
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(s)
  fbq('init', id)
  fbq('track', 'PageView')
}

export const track = (event, params) => {
  try { window.fbq?.('track', event, params) } catch {}
}
