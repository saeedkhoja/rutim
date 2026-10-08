import { CONFIG } from './config'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
const UTM_STORE = 'rutim_utm'

// Sahifa ochilganda URL dagi UTM larni sessionStorage ga saqlaymiz — foydalanuvchi sahifada
// aylanib, URL o‘zgarsa ham ariza bilan birga yuboriladi.
export function captureUtm() {
  try {
    const q = new URLSearchParams(location.search)
    const found = Object.fromEntries(UTM_KEYS.filter((k) => q.get(k)).map((k) => [k, q.get(k).slice(0, 100)]))
    if (Object.keys(found).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(found))
  } catch {}
}

// "utm_source=instagram&utm_campaign=..." ko‘rinishida
export function getUtm() {
  let data = {}
  try { data = JSON.parse(sessionStorage.getItem(UTM_STORE) || '{}') } catch {}
  if (!Object.keys(data).length) {
    try {
      const q = new URLSearchParams(location.search)
      data = Object.fromEntries(UTM_KEYS.filter((k) => q.get(k)).map((k) => [k, q.get(k)]))
    } catch {}
  }
  return new URLSearchParams(data).toString()
}

export async function sendLead(payload) {
  const res = await fetch(CONFIG.leadEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`lead ${res.status}`)
  return res.json()
}
