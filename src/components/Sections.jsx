import { useLang } from '../i18n'
import { useLead } from '../store'
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

export const LEAD_TYPES = ['after', 'nasiya', 'wholesale', 'consult']
const TYPE_ICONS = { after: 'wallet', nasiya: 'calendar', wholesale: 'box', consult: 'chat' }

export function Offer() {
  const { t } = useLang()
  const { openLead } = useLead()
  return (
    <section className="section offer" id="offer">
      <div className="offer__glow" aria-hidden="true" />
      <div className="container">
        <Head kicker={t.offer.kicker} title={t.offer.title} light />
        <div className="offer__grid">
          {LEAD_TYPES.map((id, i) => (
            <button key={id} type="button" className={`plan ${i === 0 ? 'plan--hot' : ''}`} onClick={() => openLead({ type: id })}>
              <span className="plan__top">
                <span className="plan__icon"><Icon name={TYPE_ICONS[id]} size={24} /></span>
                {i === 0 && <span className="plan__badge">{t.offer.hot}</span>}
              </span>
              <span className="plan__t">{t.lead.types[id]}</span>
              <span className="plan__d">{t.offer.items[id]}</span>
              <span className="plan__pick">{t.offer.pick} <Icon name="arrow" size={18} /></span>
            </button>
          ))}
        </div>
        <p className="offer__contract"><Icon name="doc" size={18} /> {t.offer.contract}</p>
      </div>
    </section>
  )
}

export function Who() {
  const { t } = useLang()
  const icons = ['home', 'store', 'factory', 'bolt']
  return (
    <section className="section who" id="who">
      <div className="container">
        <Head kicker={t.who.kicker} title={t.who.title} lead={t.who.lead} />
        <div className="who__grid">
          {t.who.items.map((it, i) => (
            <article key={it.t} className="who__card">
              <span className="who__icon"><Icon name={icons[i]} size={24} /></span>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
              <span className="who__power">{it.p}</span>
            </article>
          ))}
        </div>
        <div className="sellers">
          <p>{t.who.sellersTitle}</p>
          <ul>
            {t.who.sellers.map((s) => <li key={s}><Icon name="check" size={15} strokeWidth={2.4} /> {s}</li>)}
          </ul>
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

export function FinalCta() {
  const { t } = useLang()
  const { openLead } = useLead()
  return (
    <section className="final">
      <div className="container final__box">
        <div className="final__copy">
          <h2>{t.final.title}</h2>
          <p>{t.final.text}</p>
          <button type="button" className="btn btn--light btn--lg" onClick={() => openLead()}>
            {t.final.cta} <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="final__media" aria-hidden="true">
          <img src="/products/RRC95-3000VA/01-sm.webp" alt="" loading="lazy" width="480" height="640" />
          <img src="/products/RRC45-10KVA/01-sm.webp" alt="" loading="lazy" width="480" height="640" />
        </div>
      </div>
    </section>
  )
}
