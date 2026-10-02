import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { scrollToId, useLead } from '../store'

const LINKS = ['offer', 'products', 'who']

export default function Header() {
  const { t, lang, setLang } = useLang()
  const { openLead } = useLead()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__row">
        <a href="#top" className="header__logo" onClick={go('top')} aria-label="RUTIM electric">
          <img src="/brand/logo-dark.png" alt="RUTIM electric" width="140" height="38" />
        </a>

        <nav className="header__nav" aria-label="Main">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>{t.nav[id]}</a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang" role="group" aria-label="Language">
            {['uz', 'ru'].map((l) => (
              <button key={l} type="button" className={lang === l ? 'is-active' : ''} aria-pressed={lang === l}
                onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button type="button" className="btn btn--primary btn--sm header__cta" onClick={() => openLead()}>{t.nav.cta}</button>
        </div>
      </div>
    </header>
  )
}
