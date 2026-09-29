import { useLang } from '../i18n'
import { scrollToId } from '../store'
import { telegramLink } from '../config'
import Icon from './Icon'
import VoltageMonitor from './VoltageMonitor'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow"><Icon name="doc" size={16} /> {h.eyebrow}</p>
          <h1 className="hero__title">
            {h.title1}<br />
            <span className="accent">{h.title2}</span>
          </h1>
          <p className="hero__lead">{h.lead}</p>
          <ul className="hero__chips">
            {h.chips.map((c) => (
              <li key={c}><Icon name="check" size={16} strokeWidth={2.4} /> {c}</li>
            ))}
          </ul>
          <div className="hero__cta">
            <a href="#lead" className="btn btn--primary btn--lg" onClick={(e) => { e.preventDefault(); scrollToId('lead') }}>
              {h.cta} <Icon name="arrow" size={18} />
            </a>
            <a href={telegramLink(t.lead.tgMsg)} className="btn btn--dark btn--lg" target="_blank" rel="noopener">
              <Icon name="telegram" size={20} /> {h.tg}
            </a>
          </div>
          <p className="hero__note">{h.note}</p>
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

      <div className="container">
        <ul className="stats">
          {t.stats.map((s) => (
            <li key={s.l}><b>{s.v}</b><span>{s.l}</span></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
