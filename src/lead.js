import { CONFIG } from './config'

export const utm = () => {
  try {
    const q = new URLSearchParams(location.search)
    return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .filter((k) => q.get(k))
      .map((k) => `${k}=${q.get(k)}`)
      .join('&')
  } catch { return '' }
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
