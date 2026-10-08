import { T } from '../copy'
import { CONFIG } from '../config'
import { scrollToId } from '../store'
import Icon from './Icon'
import VoltageMonitor from './VoltageMonitor'

const BADGE_ICONS = ['tag', 'swap', 'truck']

export default function Hero() {
  const h = T.hero

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow"><Icon name="store" size={16} /> {h.eyebrow}</p>
          <h1 className="hero__title">
            {h.title1} <span className="accent">{h.title2}</span>
          </h1>
          <p className="hero__lead"><Icon name="snow" size={18} className="hero__snow" />{h.lead}</p>

          <ul className="hero__badges">
            {h.badges.map((b, i) => (
              <li key={b}><Icon name={BADGE_ICONS[i]} size={18} /> {b}</li>
            ))}
          </ul>

          <div className="hero__cta" id="hero-cta">
            <a href="#lead" className="btn btn--primary btn--lg" onClick={(e) => { e.preventDefault(); scrollToId('lead') }}>
              {h.cta} <Icon name="arrow" size={18} />
            </a>
            {CONFIG.telegramLink && (
              <a href={CONFIG.telegramLink} className="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer">
                <Icon name="telegram" size={20} /> {h.telegram}
              </a>
            )}
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
