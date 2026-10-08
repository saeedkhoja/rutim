import { T } from '../copy'
import { CONFIG, TESTIMONIALS } from '../config'
import { scrollToId, useLead } from '../store'
import { PRODUCTS, SERIES, powerLabel, seriesRange } from '../data/products'
import Icon from './Icon'

export function Head({ kicker, title, lead, light }) {
  return (
    <div className={`sec-head ${light ? 'sec-head--light' : ''}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {lead && <p className="sec-head__lead">{lead}</p>}
    </div>
  )
}

// Har bir seriya: modellar soni, quvvat va kuchlanish oralig‘i data/products.json dan hisoblanadi
const SERIES_INFO = SERIES.map((id) => {
  const items = PRODUCTS.filter((p) => p.series === id).sort((a, b) => a.va - b.va)
  const top = items[items.length - 1]
  return {
    id,
    count: items.length,
    power: `${powerLabel(items[0].va)} – ${powerLabel(top.va)}`,
    input: seriesRange(id),
    output: items[0].output,
    img: top.images[0].sm,
  }
})

export function About() {
  const { requestLead } = useLead()
  const A = T.about
  return (
    <section className="section about" id="about">
      <div className="about__glow" aria-hidden="true" />
      <div className="container">
        <Head kicker={A.kicker} title={A.title} lead={A.lead} light />

        <ul className="about__stats">
          {A.stats.map((s) => <li key={s.l}><b>{s.v}</b><span>{s.l}</span></li>)}
        </ul>

        <div className="series__grid">
          {SERIES_INFO.map((s) => (
            <article key={s.id} className="series">
              <div className="series__media">
                <img src={s.img} alt={`RUTIM ${s.id}`} loading="lazy" width="480" height="640" />
                <span className={`tag tag--${s.id}`}>{T.series[s.id].tag}</span>
              </div>
              <div className="series__body">
                <h3>{s.id} <small>{T.series[s.id].type} · {s.count} {A.models}</small></h3>
                <p>{T.series[s.id].short}</p>
                <dl className="series__specs">
                  <div><dt>{A.power}</dt><dd>{s.power}</dd></div>
                  <div><dt>{A.input}</dt><dd>{s.input}</dd></div>
                  <div><dt>{A.output}</dt><dd>{s.output}</dd></div>
                </dl>
                <a href="#products" className="series__link" onClick={(e) => { e.preventDefault(); scrollToId('products') }}>
                  {A.see} <Icon name="arrow" size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="about__cta">
          <p>{A.ctaText}</p>
          <button type="button" className="btn btn--primary" onClick={() => requestLead()}>
            {A.cta} <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export function Risk() {
  return (
    <section className="risk">
      <div className="container">
        <div className="risk__box">
          <div className="risk__seal" aria-hidden="true">
            <Icon name="swap" size={26} />
            <b>{T.risk.badge}</b>
            <small>{T.risk.badgeSub}</small>
          </div>
          <div>
            <h2>{T.risk.title}</h2>
            <p>{T.risk.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section className="section who" id="why">
      <div className="container">
        <Head kicker={T.why.kicker} title={T.why.title} />
        <div className="why__grid">
          {T.why.items.map((it) => (
            <article key={it.t} className="who__card">
              <span className="who__icon"><Icon name={it.icon} size={24} /></span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Segment() {
  const { requestLead } = useLead()
  return (
    <section className="segment">
      <div className="container">
        <div className="segment__box">
          <div className="segment__icons" aria-hidden="true">
            <span><Icon name="flame" size={26} /></span>
            <span className="segment__plus">+</span>
            <span><Icon name="snow" size={26} /></span>
            <span className="segment__plus">+</span>
            <span className="is-red"><Icon name="bolt" size={26} /></span>
          </div>
          <div className="segment__copy">
            <h2>{T.segment.title}</h2>
            <p>{T.segment.text}</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => requestLead()}>
            {T.segment.cta} <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

// Faqat to‘ldirilgan fikrlar ko‘rsatiladi (src/config.js → TESTIMONIALS). Bo‘sh bo‘lsa bo‘lim chiqmaydi.
export function Reviews() {
  const items = TESTIMONIALS.filter((r) => r.quote?.trim())
  if (!items.length) return null
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <Head kicker={T.reviews.kicker} title={T.reviews.title} />
        <div className="reviews__grid">
          {items.map((r, i) => (
            <figure key={i} className="review">
              {r.video && (
                <div className="review__video">
                  <iframe src={r.video} title={`${r.name} — video`} loading="lazy" allowFullScreen
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" />
                </div>
              )}
              <Icon name="quote" size={26} className="review__q" />
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <b>{r.name}</b>
                <span>{[r.shopType, r.city].filter(Boolean).join(' · ')}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq__wrap">
        <Head kicker={T.faq.kicker} title={T.faq.title} />
        <div className="faq__list">
          {T.faq.items.map((it) => (
            <details key={it.q} className="faq__item">
              <summary>{it.q}<Icon name="plus" size={20} /></summary>
              <p>{it.a(CONFIG)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
