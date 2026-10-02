import { appendFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleLead } from './server/lead.js'

const LOCAL_LEADS = 'leads.local.jsonl'

// dev/preview rejimida /api/lead ni lokal ishlatish (production’da api/lead.js ishlaydi).
// Bot sozlanmagan bo‘lsa, arizalar leads.local.jsonl fayliga yoziladi — formani lokal sinash uchun.
function leadApi(env) {
  const mw = (req, res, next) => {
    if (req.url !== '/api/lead' || req.method !== 'POST') return next()
    let raw = ''
    req.on('data', (c) => { raw += c; if (raw.length > 20000) req.destroy() })
    req.on('end', async () => {
      let out
      try { out = await handleLead(JSON.parse(raw || '{}'), env) } catch { out = { status: 500, json: { ok: false } } }
      if (out.json.error === 'not_configured') {
        appendFileSync(LOCAL_LEADS, JSON.stringify({ at: new Date().toISOString(), ...out.lead }) + '\n')
        console.log(`[lead] bot sozlanmagan — ariza ${LOCAL_LEADS} ga yozildi:`, out.lead.name, out.lead.phone)
        out = { status: 200, json: { ok: true, local: true } }
      }
      res.statusCode = out.status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(out.json))
    })
  }
  return {
    name: 'lead-api',
    configureServer(s) { s.middlewares.use(mw) },
    configurePreviewServer(s) { s.middlewares.use(mw) },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), leadApi(env)] }
})
