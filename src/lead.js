import { CONFIG } from './config'
import { byModel } from './data/products'

export const utm = () => {
  try {
    const q = new URLSearchParams(location.search)
    return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .filter((k) => q.get(k))
      .map((k) => `${k}=${q.get(k)}`)
      .join('&')
  } catch { return '' }
}

export const itemsList = (items) =>
  Object.entries(items).map(([m, q]) => ({ model: byModel[m]?.name || m, qty: q }))

// Telegram chatga yuboriladigan tayyor matn (fallback va "Telegram orqali" tugmasi uchun)
export function leadText(t, { name, phone, shop, payModel, items }) {
  const lines = [t.lead.tgMsg, '']
  if (name) lines.push(`${t.lead.name}: ${name}`)
  if (phone) lines.push(`${t.lead.phone}: ${phone}`)
  if (shop) lines.push(`${t.lead.shop}: ${shop}`)
  if (payModel) lines.push(`${t.lead.model}: ${t.lead.models[payModel]}`)
  const list = itemsList(items)
  if (list.length) {
    lines.push('', `${t.lead.list}:`)
    list.forEach((i) => lines.push(`• RUTIM ${i.model} × ${i.qty}`))
  }
  return lines.join('\n')
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
