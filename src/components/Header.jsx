import { useEffect, useState } from 'react'
import { T } from '../copy'
import { scrollToId } from '../store'

const LINKS = ['about', 'calc', 'products', 'faq']

export default function Header() {
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

        <nav className="header__nav" aria-label="Asosiy">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>{T.nav[id]}</a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#lead" className="btn btn--primary btn--sm header__cta" onClick={go('lead')}>{T.nav.cta}</a>
        </div>
      </div>
    </header>
  )
}
