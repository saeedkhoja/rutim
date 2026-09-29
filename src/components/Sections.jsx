import { useState } from 'react'
import { useLang } from '../i18n'
import { scrollToId, useStore } from '../store'
import Icon from './Icon'

function Head({ kicker, title, lead, light }) {
  return (
    <div className={`sec-head ${light ? 'sec-head--light' : ''}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lead && <p className="sec-head__lead">{lead}</p>}
    </div>
  )
}

export function Pain() {
  const { t } = useLang()
  const icons = ['wallet', 'store', 'trend']
  return (
    <section className="section pain">
      <div className="container">
        <Head kicker={t.pain.kicker} title={t.pain.title} />
        <div className="pain__grid">
          {t.pain.items.map((it, i) => (
            <article key={it.t} className="pain__card">
              <span className="pain__num">0{i + 1}</span>
              <Icon name={icons[i]} size={26} />
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
        <p className="pain__answer"><Icon name="bolt" size={20} /> {t.pain.answer}</p>
      </div>
    </section>
  )
}

const PAY_IDS = ['after', 'nasiya', 'wholesale']

export function Offer() {
  const { t } = useLang()
  const { setPayModel } = useStore()
  const icons = ['wallet', 'calendar', 'box']
  const pick = (id) => {
    setPayModel(id)
    scrollToId('lead')
  }
  return (
    <section className="section offer" id="offer">
      <div className="offer__glow" aria-hidden="true" />
      <div className="container">
        <div className="sec-head sec-head--light">
          <p className="kicker">{t.offer.kicker}</p>
          <h2 className="offer__title">{t.offer.title1} <span className="accent">{t.offer.title2}</span></h2>
          <p className="sec-head__lead">{t.offer.lead}</p>
        </div>

        <div className="offer__grid">
          {t.offer.models.map((m, i) => (
            <article key={m.t} className={`plan ${i === 0 ? 'plan--hot' : ''}`}>
              <div className="plan__top">
                <span className="plan__icon"><Icon name={icons[i]} size={24} /></span>
                <span className="plan__badge">{m.badge}</span>
              </div>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              <ul>
                {m.points.map((p) => <li key={p}><Icon name="check" size={16} strokeWidth={2.4} /> {p}</li>)}
              </ul>
              <button type="button" className={`btn ${i === 0 ? 'btn--primary' : 'btn--outline-light'}`} onClick={() => pick(PAY_IDS[i])}>
                {t.offer.pick} <Icon name="arrow" size={18} />
              </button>
            </article>
          ))}
        </div>
        <p className="offer__contract"><Icon name="doc" size={18} /> {t.offer.contract}</p>

        <div className="compare">
          <h3 className="compare__title">{t.compare.title}</h3>
          <div className="compare__table" role="table">
            <div className="compare__row compare__row--head" role="row">
              <span role="columnheader" />
              <span role="columnheader">{t.compare.colA}</span>
              <span role="columnheader" className="is-us">{t.compare.colB}</span>
            </div>
            {t.compare.rows.map(([k, a, b]) => (
              <div className="compare__row" role="row" key={k}>
                <span role="rowheader">{k}</span>
                <span role="cell" className="is-them"><Icon name="x" size={16} /> {a}</span>
                <span role="cell" className="is-us"><Icon name="check" size={16} strokeWidth={2.4} /> {b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function How() {
  const { t } = useLang()
  return (
    <section className="section how" id="how">
      <div className="container">
        <Head kicker={t.how.kicker} title={t.how.title} />
        <ol className="how__steps">
          {t.how.steps.map((s, i) => (
            <li key={s.t} className="how__step">
              <span className="how__node">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Who() {
  const { t } = useLang()
  const icons = ['bolt', 'appliance', 'brick', 'wrench', 'bag', 'factory']
  return (
    <section className="section who">
      <div className="container">
        <Head kicker={t.who.kicker} title={t.who.title} />
        <div className="who__grid">
          {t.who.items.map((it, i) => (
            <article key={it.t} className="who__card">
              <span className="who__icon"><Icon name={icons[i]} size={24} /></span>
              <div>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Demand() {
  const { t } = useLang()
  const icons = ['home', 'season', 'trend']
  return (
    <section className="section demand">
      <div className="container demand__grid">
        <Head kicker={t.demand.kicker} title={t.demand.title} />
        <div className="demand__list">
          {t.demand.items.map((it, i) => (
            <article key={it.t} className="demand__item">
              <Icon name={icons[i]} size={24} />
              <div>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Support() {
  const { t } = useLang()
  const icons = ['doc', 'camera', 'headset', 'shield', 'bag', 'user']
  return (
    <section className="section support">
      <div className="container">
        <Head kicker={t.support.kicker} title={t.support.title} />
        <div className="support__grid">
          {t.support.items.map((it, i) => (
            <article key={it.t} className="support__card">
              <Icon name={icons[i]} size={26} />
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const { t } = useLang()
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <Head kicker={t.faq.kicker} title={t.faq.title} />
        <div className="faq__list">
          {t.faq.items.map((it, i) => (
            <div key={it.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {it.q} <Icon name="chevron" size={20} />
              </button>
              <div className="faq__a" hidden={open !== i}><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
