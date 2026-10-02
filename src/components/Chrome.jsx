import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { useLead } from '../store'
import { CONFIG, phoneHref } from '../config'
import Icon from './Icon'

// Mobil ekranda pastda doimiy "Ariza qoldirish" tugmasi (hero’dagi tugma ekranda ko‘rinmaganda chiqadi)
export function MobileBar() {
  const { t } = useLang()
  const { lead, openLead } = useLead()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = document.getElementById('hero-cta')
    if (!el || !('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mobile-bar ${show && !lead ? 'is-visible' : ''}`}>
      <button type="button" className="btn btn--primary btn--block" onClick={() => openLead()}>
        {t.nav.cta} <Icon name="arrow" size={18} />
      </button>
    </div>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div>
          <img src="/brand/logo-light.png" alt="RUTIM electric" width="150" height="41" loading="lazy" />
          <p>{t.footer.about}</p>
        </div>
        <ul>
          {CONFIG.phone && <li><a href={phoneHref()}><Icon name="phone" size={16} /> {CONFIG.phone}</a></li>}
          <li>{CONFIG.company}</li>
          <li>{t.footer.inn}: {CONFIG.inn}</li>
        </ul>
      </div>
      <div className="container">
        <div className="footer__bottom">© {new Date().getFullYear()} RUTIM electric. {t.footer.rights}</div>
      </div>
    </footer>
  )
}
