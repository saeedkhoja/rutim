import { useEffect, useState } from 'react'
import { T } from '../copy'
import { scrollToId } from '../store'
import { CONFIG, phoneHref } from '../config'
import Icon from './Icon'

// Mobil ekranda pastda doimiy "Diler narxlarini olish" tugmasi.
// Hero’dagi tugma yoki ariza formasi ekranda bo‘lganda yashirinadi.
export function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const els = ['hero-cta', 'lead'].map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) { setShow(true); return }
    const seen = new Map()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting))
      setShow(![...seen.values()].some(Boolean))
    })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`mobile-bar ${show ? 'is-visible' : ''}`}>
      <button type="button" className="btn btn--primary btn--block" onClick={() => scrollToId('lead')}>
        {T.nav.cta} <Icon name="arrow" size={18} />
      </button>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div>
          <img src="/brand/logo-light.png" alt="RUTIM electric" width="150" height="41" loading="lazy" />
          <p>{T.footer.about}</p>
        </div>
        <ul>
          {CONFIG.phone && <li><a href={phoneHref()}><Icon name="phone" size={16} /> {CONFIG.phone}</a></li>}
          {CONFIG.telegramLink && (
            <li><a href={CONFIG.telegramLink} target="_blank" rel="noopener noreferrer"><Icon name="telegram" size={16} /> Telegram</a></li>
          )}
          <li>{CONFIG.company}</li>
          <li>{T.footer.inn}: {CONFIG.inn}</li>
        </ul>
      </div>
      <div className="container">
        <div className="footer__bottom">© {new Date().getFullYear()} RUTIM electric. {T.footer.rights}</div>
      </div>
    </footer>
  )
}
