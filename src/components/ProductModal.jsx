import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { scrollToId, useStore } from '../store'
import { byModel, powerLabel } from '../data/products'
import Icon from './Icon'

function specRows(p, t) {
  const s = t.specs
  const rows = [
    [s.series, p.series],
    [s.type, t.series[p.series].type],
    [s.power, p.va >= 5000 ? `${powerLabel(p.va)} (${p.va.toLocaleString('ru-RU')} VA)` : powerLabel(p.va)],
    [s.phase, s.phaseV],
    [s.input, p.input],
    [s.output, p.output],
    [s.freq, '50/60 Hz'],
    [s.display, s.displayV],
  ]
  if (p.series === 'RRC95') rows.push([s.bypass, s.bypassV])
  rows.push([s.cooling, s.coolingV])
  if (p.series === 'RRC45') rows.push([s.eff, '>95%'], [s.ip, 'IP20'], [s.warranty, s.warrantyV])
  return rows
}

export default function ProductModal({ model, onClose }) {
  const { t } = useLang()
  const { items, setQty } = useStore()
  const p = byModel[model]
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const [qty, setQ] = useState(items[model] || 1)

  useEffect(() => {
    const d = ref.current
    d?.showModal()
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  const n = p.images.length
  const go = (d) => setIdx((i) => (i + d + n) % n)

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const save = () => { setQty(model, qty); onClose() }
  const ask = () => { setQty(model, qty); onClose(); setTimeout(() => scrollToId('lead'), 50) }
  const inList = items[model] > 0

  return (
    <dialog ref={ref} className="modal" onClose={onClose} onKeyDown={onKey}
      onClick={(e) => { if (e.target === ref.current) ref.current.close() }} aria-labelledby="pm-title">
      <div className="modal__box">
        <button type="button" className="modal__close" onClick={() => ref.current.close()} aria-label={t.modal.close}>
          <Icon name="x" size={22} />
        </button>

        <div className="gallery">
          <div className="gallery__main">
            <img key={idx} src={p.images[idx].lg} alt={`RUTIM ${p.name} — ${idx + 1}/${n}`} width="900" height="1200" />
            <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Prev"><Icon name="left" size={22} /></button>
            <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next"><Icon name="right" size={22} /></button>
            <span className="gallery__count">{idx + 1} / {n}</span>
          </div>
          <div className="gallery__thumbs">
            {p.images.map((im, i) => (
              <button type="button" key={im.sm} className={i === idx ? 'is-active' : ''} onClick={() => setIdx(i)} aria-label={`${i + 1}`}>
                <img src={im.sm} alt="" loading="lazy" width="480" height="640" />
              </button>
            ))}
          </div>
        </div>

        <div className="modal__info">
          <span className={`tag tag--${p.series}`}>{p.series} · {t.series[p.series].tag}</span>
          <h3 id="pm-title">RUTIM <span className="nowrap">{p.name}</span></h3>
          <p className="modal__power">{powerLabel(p.va)} <span>· {p.input} → {p.output}</span></p>
          <p className="modal__desc">{t.series[p.series].short}</p>

          <table className="specs">
            <tbody>
              {specRows(p, t).map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
            </tbody>
          </table>

          <h4>{t.specs.protection}</h4>
          <ul className="pills">{t.specs.protect[p.series].map((x) => <li key={x}><Icon name="shield" size={14} /> {x}</li>)}</ul>
          <h4>{t.specs.usage}</h4>
          <ul className="pills pills--soft">{t.specs.uses[p.series].map((x) => <li key={x}>{x}</li>)}</ul>

          <div className="modal__buy">
            <div className="qty" aria-label={t.modal.qty}>
              <button type="button" onClick={() => setQ((q) => Math.max(1, q - 1))} aria-label="-"><Icon name="minus" size={18} /></button>
              <input type="number" min="1" max="999" value={qty} inputMode="numeric"
                onChange={(e) => setQ(Math.max(1, Math.min(999, Number(e.target.value) || 1)))} aria-label={t.modal.qty} />
              <button type="button" onClick={() => setQ((q) => Math.min(999, q + 1))} aria-label="+"><Icon name="plus" size={18} /></button>
              <span>{t.modal.pcs}</span>
            </div>
            <button type="button" className="btn btn--dark" onClick={save}>
              <Icon name="list" size={18} /> {inList ? t.modal.update : t.modal.add}
            </button>
            <button type="button" className="btn btn--primary" onClick={ask}>
              {t.modal.ask} <Icon name="arrow" size={18} />
            </button>
          </div>
          <a className="modal__uzum" href={p.uzumUrl} target="_blank" rel="noopener">
            {t.modal.uzum} <Icon name="external" size={16} />
          </a>
        </div>
      </div>
    </dialog>
  )
}
