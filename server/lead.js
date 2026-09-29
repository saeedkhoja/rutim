// Arizani Telegram botga yuboradi. Token faqat serverda saqlanadi (brauzerga chiqmaydi).
const esc = (s = '') => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

export async function handleLead(body, env) {
  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return { status: 503, json: { ok: false, error: 'not_configured' } }

  const name = String(body?.name || '').trim().slice(0, 60)
  const phone = String(body?.phone || '').trim().slice(0, 30)
  if (name.length < 2 || phone.replace(/\D/g, '').length < 12) {
    return { status: 400, json: { ok: false, error: 'invalid' } }
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : []
  const lines = ['<b>🔌 Yangi B2B ariza — RUTIM</b>', '', `👤 <b>${esc(name)}</b>`, `📞 ${esc(phone)}`]
  if (body.shop) lines.push(`🏪 ${esc(String(body.shop).slice(0, 120))}`)
  if (body.payModel) lines.push(`🤝 ${esc(String(body.payModel).slice(0, 60))}`)
  if (items.length) {
    lines.push('', '<b>📦 Tanlangan modellar:</b>')
    items.forEach((i) => lines.push(`• ${esc(String(i.model).slice(0, 40))} × ${Number(i.qty) || 1}`))
  }
  lines.push('', `🌐 ${esc(body.lang || '')} · ${esc(String(body.page || '').slice(0, 200))}`)
  if (body.utm) lines.push(`📊 ${esc(String(body.utm).slice(0, 200))}`)

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
  })
  if (!r.ok) return { status: 502, json: { ok: false, error: 'telegram' } }
  return { status: 200, json: { ok: true } }
}
