import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { scrollToId } from '../store'
import { telegramLink } from '../config'
import Icon from './Icon'

const LINKS = ['offer', 'how', 'catalog', 'kits', 'faq']

export default function Header() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
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
          <a className="btn btn--ghost btn--sm header__tg" href={telegramLink(t.lead.tgMsg)} target="_blank" rel="noopener">
            <Icon name="telegram" size={18} /> <span>Telegram</span>
          </a>
          <a className="btn btn--primary btn--sm header__cta" href="#lead" onClick={go('lead')}>{t.nav.cta}</a>
          <button type="button" className="header__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span /><span />
          </button>
        </div>
      </div>

      <div className="header__mobile" hidden={!open}>
        {LINKS.map((id) => (
          <a key={id} href={`#${id}`} onClick={go(id)}>{t.nav[id]}</a>
        ))}
        <a className="btn btn--primary" href="#lead" onClick={go('lead')}>{t.nav.cta}</a>
      </div>
    </header>
  )
}
