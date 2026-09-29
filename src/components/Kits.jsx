import { useLang } from '../i18n'
import { useStore } from '../store'
import { KITS, byModel } from '../data/products'
import Icon from './Icon'

export default function Kits({ onOpen }) {
  const { t } = useLang()
  const { addMany, setDrawer } = useStore()

  return (
    <section className="section kits" id="kits">
      <div className="container">
        <div className="sec-head">
          <p className="kicker">{t.kits.kicker}</p>
          <h2>{t.kits.title}</h2>
          <p className="sec-head__lead">{t.kits.lead}</p>
        </div>
        <div className="kits__grid">
          {KITS.map((k) => {
            const info = t.kits.items[k.id]
            const entries = Object.entries(k.items)
            const total = entries.reduce((a, [, q]) => a + q, 0)
            return (
              <article key={k.id} className={`kit kit--${k.id}`}>
                <div className="kit__media" aria-hidden="true">
                  {entries.slice(0, 5).map(([m]) => (
                    <img key={m} src={byModel[m].images[0].sm} alt="" loading="lazy" width="480" height="640" />
                  ))}
                </div>
                <div className="kit__body">
                  <p className="kit__for">{info.for}</p>
                  <h3>{info.t}</h3>
                  <p className="kit__desc">{info.d}</p>
                  <ul className="kit__list">
                    {entries.map(([m, q]) => (
                      <li key={m}>
                        <button type="button" onClick={() => onOpen(m)}>{byModel[m].name}</button>
                        <span>× {q}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="kit__total">{t.kits.total}: <b>{total} {t.kits.pcs}</b> · {entries.length} {t.kits.models}</p>
                  <button type="button" className="btn btn--primary btn--block" onClick={() => { addMany(k.items); setDrawer(true) }}>
                    <Icon name="plus" size={18} strokeWidth={2.4} /> {t.kits.add}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
