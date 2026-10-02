import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { useLead } from '../store'
import { byModel, fitKey, powerLabel } from '../data/products'
import Icon from './Icon'

function specRows(p, t) {
  const s = t.specs
  const rows = [
    [s.type, t.series[p.series].type],
    [s.power, p.va >= 5000 ? `${powerLabel(p.va)} (${p.va.toLocaleString('ru-RU')} VA)` : powerLabel(p.va)],
    [s.input, p.input],
    [s.output, p.output],
    [s.display, s.displayV],
  ]
  if (p.series === 'RRC95') rows.push([s.bypass, s.bypassV])
  return rows
}

export default function ProductModal({ model, onClose }) {
  const { t } = useLang()
  const { openLead } = useLead()
  const p = byModel[model]
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    ref.current?.showModal()
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  const n = p.images.length
  const go = (d) => setIdx((i) => (i + d + n) % n)

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const ask = () => {
    ref.current.close()
    openLead({ model: p.model })
  }

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
          <p className="modal__power">{powerLabel(p.va)}</p>
          <p className="modal__fit"><Icon name="check" size={16} strokeWidth={2.4} /> {t.products.fitFor}: {t.fit[fitKey(p.va)]}</p>

          <table className="specs">
            <tbody>
              {specRows(p, t).map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
            </tbody>
          </table>

          <h4>{t.specs.protection}</h4>
          <ul className="pills">{t.specs.protect[p.series].map((x) => <li key={x}><Icon name="shield" size={14} /> {x}</li>)}</ul>

          <div className="modal__buy">
            <button type="button" className="btn btn--primary btn--lg btn--block" onClick={ask}>
              {t.modal.ask} <Icon name="arrow" size={18} />
            </button>
            <p>{t.modal.askNote}</p>
          </div>
        </div>
      </div>
    </dialog>
  )
}
