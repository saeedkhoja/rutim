// Arizani tekshiradi va menejerlar Telegram chatiga bot orqali yuboradi.
// Token faqat serverda saqlanadi (brauzerga chiqmaydi).
const esc = (s = '') => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
const str = (v, max) => String(v || '').trim().slice(0, max)

export function parseLead(body) {
  const lead = {
    name: str(body?.name, 60),
    phone: str(body?.phone, 30),
    shop: str(body?.shop, 120),
    city: str(body?.city, 60),
    type: str(body?.type, 60),
    model: str(body?.model, 40),
    lang: str(body?.lang, 5),
    page: str(body?.page, 200),
    utm: str(body?.utm, 200),
  }
  const ok = lead.name.length >= 2 && lead.phone.replace(/\D/g, '').length === 12
    && lead.shop.length >= 2 && lead.city && lead.type
  return ok ? lead : null
}

export function leadMessage(l) {
  const lines = [
    '<b>🔌 Yangi ariza — RUTIM</b>',
    '',
    `👤 <b>${esc(l.name)}</b>`,
    `📞 ${esc(l.phone)}`,
    `🏪 ${esc(l.shop)}`,
    `📍 ${esc(l.city)}`,
    `🤝 ${esc(l.type)}`,
  ]
  if (l.model) lines.push(`📦 ${esc(l.model)}`)
  lines.push('', `🌐 ${esc(l.lang)} · ${esc(l.page)}`)
  if (l.utm) lines.push(`📊 ${esc(l.utm)}`)
  return lines.join('\n')
}

export async function handleLead(body, env) {
  const lead = parseLead(body)
  if (!lead) return { status: 400, json: { ok: false, error: 'invalid' } }

  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return { status: 503, json: { ok: false, error: 'not_configured' }, lead }

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: leadMessage(lead), parse_mode: 'HTML', disable_web_page_preview: true }),
  })
  if (!r.ok) return { status: 502, json: { ok: false, error: 'telegram' } }
  return { status: 200, json: { ok: true } }
}
