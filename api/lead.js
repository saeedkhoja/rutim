// Vercel serverless funksiyasi: POST /api/lead
import { handleLead } from '../server/lead.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  try {
    const { status, json } = await handleLead(req.body, process.env)
    res.status(status).json(json)
  } catch {
    res.status(500).json({ ok: false })
  }
}
