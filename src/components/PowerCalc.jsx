import { useMemo, useState } from 'react'
import { useLang } from '../i18n'
import { APPLIANCES, PRODUCTS, powerLabel } from '../data/products'
import Icon from './Icon'

const RESERVE = 1.25

export default function PowerCalc({ onOpen }) {
  const { t } = useLang()
  const [counts, setCounts] = useState({ fridge: 1, tv: 1, ac9: 1 })
  const [low, setLow] = useState(false)

  const change = (id, d) => setCounts((c) => {
    const v = Math.max(0, Math.min(9, (c[id] || 0) + d))
    const n = { ...c, [id]: v }
    if (!v) delete n[id]
    return n
  })

  const { need, rec } = useMemo(() => {
    let sum = 0
    let surge = 0
    for (const a of APPLIANCES) {
      const c = counts[a.id] || 0
      if (!c) continue
      sum += a.w * c
      surge = Math.max(surge, a.w * (a.k - 1))
    }
    const need = Math.round(((sum + surge) * RESERVE) / 100) * 100
    const series = low ? 'RRC45' : 'RRC95'
    const rec = need ? PRODUCTS.filter((p) => p.series === series).sort((a, b) => a.va - b.va).find((p) => p.va >= need) : null
    return { need, rec }
  }, [counts, low])

  return (
    <section className="section calc" id="calc">
      <div className="container calc__grid">
        <div>
          <div className="sec-head">
            <p className="kicker">{t.calc.kicker}</p>
            <h2>{t.calc.title}</h2>
            <p className="sec-head__lead">{t.calc.lead}</p>
          </div>
          <ul className="calc__list">
            {APPLIANCES.map((a) => {
              const c = counts[a.id] || 0
              return (
                <li key={a.id} className={c ? 'is-on' : ''}>
                  <span className="calc__name">{t.calc.appliances[a.id]}<small>~{a.w} W</small></span>
                  <span className="calc__qty">
                    <button type="button" onClick={() => change(a.id, -1)} disabled={!c} aria-label="-"><Icon name="minus" size={16} /></button>
                    <b aria-live="polite">{c}</b>
                    <button type="button" onClick={() => change(a.id, 1)} aria-label="+"><Icon name="plus" size={16} /></button>
                  </span>
                </li>
              )
            })}
          </ul>
          <label className="switch">
            <input type="checkbox" checked={low} onChange={(e) => setLow(e.target.checked)} />
            <span className="switch__ui" /> {t.calc.low}
          </label>
        </div>

        <aside className="calc__result" aria-live="polite">
          <p className="calc__label">{t.calc.need}</p>
          <p className="calc__need">{need ? `${(need / 1000).toLocaleString('ru-RU')} kVA` : '—'}</p>
          <div className="calc__rec">
            {!need && <p className="calc__muted">{t.calc.none}</p>}
            {need > 0 && !rec && <p className="calc__muted">{t.calc.tooBig}</p>}
            {rec && (
              <>
                <img src={rec.images[0].sm} alt={`RUTIM ${rec.name}`} width="480" height="640" />
                <div>
                  <p className="calc__label">{t.calc.rec}</p>
                  <h3>RUTIM {rec.name}</h3>
                  <p className="calc__muted">{powerLabel(rec.va)} · {rec.input}</p>
                  <button type="button" className="btn btn--primary btn--sm" onClick={() => onOpen(rec.model)}>
                    {t.calc.open} <Icon name="arrow" size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
          <p className="calc__note">{t.calc.note}</p>
        </aside>
      </div>
    </section>
  )
}
