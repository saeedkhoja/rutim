import { useLang } from '../i18n'
import { useLead } from '../store'
import Icon from './Icon'
import VoltageMonitor from './VoltageMonitor'

const POINT_ICONS = ['wallet', 'calendar', 'bolt']

export default function Hero() {
  const { t } = useLang()
  const { openLead } = useLead()
  const h = t.hero

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow"><Icon name="store" size={16} /> {h.eyebrow}</p>
          <h1 className="hero__title">
            {h.title1} <span className="accent">{h.title2}</span>
          </h1>
          <p className="hero__lead">{h.lead}</p>

          <ul className="hero__points">
            {h.points.map((p, i) => (
              <li key={p.t}>
                <span className="hero__pi"><Icon name={POINT_ICONS[i]} size={22} /></span>
                <span><b>{p.t}</b><small>{p.d}</small></span>
              </li>
            ))}
          </ul>

          <div className="hero__cta" id="hero-cta">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openLead()}>
              {h.cta} <Icon name="arrow" size={18} />
            </button>
            <p className="hero__note"><Icon name="phone" size={15} /> {h.note}</p>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__stage">
            <img className="hero__img hero__img--back" src="/products/RTC-30KVA/01.webp" alt="RUTIM RTC-30kVA" width="900" height="1200" />
            <img className="hero__img hero__img--front" src="/products/RRC95-20KVA/01.webp" alt="RUTIM RRC95-20kVA" width="900" height="1200" fetchPriority="high" />
            <div className="hero__bolt"><Icon name="bolt" size={22} /></div>
          </div>
          <VoltageMonitor />
        </div>
      </div>
    </section>
  )
}
