import { useEffect } from 'react'
import { useLang } from '../i18n'
import { scrollToId, useStore } from '../store'
import { CONFIG, phoneHref, telegramLink } from '../config'
import { byModel, powerLabel } from '../data/products'
import { leadText } from '../lead'
import Icon from './Icon'

export function CartDrawer() {
  const { t } = useLang()
  const { items, count, setQty, clear, drawer, setDrawer, payModel } = useStore()
  const entries = Object.entries(items)

  useEffect(() => {
    if (!drawer) return
    const onKey = (e) => e.key === 'Escape' && setDrawer(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer, setDrawer])

  const send = () => {
    setDrawer(false)
    setTimeout(() => scrollToId('lead'), 50)
  }

  return (
    <>
      <button type="button" className={`cart-fab ${count ? 'is-visible' : ''}`} onClick={() => setDrawer(true)} aria-label={t.cart.title}>
        <Icon name="list" size={20} /> <span>{t.cart.btn}</span> <b>{count}</b>
      </button>

      <div className={`drawer ${drawer ? 'is-open' : ''}`} aria-hidden={!drawer}>
        <div className="drawer__backdrop" onClick={() => setDrawer(false)} />
        <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={t.cart.title}>
          <div className="drawer__head">
            <h3>{t.cart.title}</h3>
            <button type="button" onClick={() => setDrawer(false)} aria-label="×"><Icon name="x" size={22} /></button>
          </div>
          {entries.length ? (
            <ul className="drawer__list">
              {entries.map(([m, q]) => {
                const p = byModel[m]
                if (!p) return null
                return (
                  <li key={m}>
                    <img src={p.images[0].sm} alt="" width="480" height="640" />
                    <div className="drawer__info">
                      <b>RUTIM {p.name}</b>
                      <small>{powerLabel(p.va)} · {p.input}</small>
                      <div className="qty qty--sm">
                        <button type="button" onClick={() => setQty(m, q - 1)} aria-label="-"><Icon name="minus" size={16} /></button>
                        <input type="number" min="0" max="999" value={q} inputMode="numeric" aria-label={p.name}
                          onChange={(e) => setQty(m, Math.max(0, Math.min(999, Number(e.target.value) || 0)))} />
                        <button type="button" onClick={() => setQty(m, q + 1)} aria-label="+"><Icon name="plus" size={16} /></button>
                      </div>
                    </div>
                    <button type="button" className="drawer__rm" onClick={() => setQty(m, 0)} aria-label={t.cart.remove}><Icon name="trash" size={18} /></button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="drawer__empty">{t.cart.empty}</p>
          )}
          <div className="drawer__foot">
            <div className="drawer__total"><span>{t.cart.total}</span><b>{count} {t.cart.pcs}</b></div>
            <button type="button" className="btn btn--primary btn--block" disabled={!count} onClick={send}>
              {t.cart.send} <Icon name="arrow" size={18} />
            </button>
            <a className={`btn btn--tg btn--block ${count ? '' : 'is-disabled'}`} target="_blank" rel="noopener"
              href={telegramLink(leadText(t, { items, payModel }))}>
              <Icon name="telegram" size={18} /> {t.cart.tg}
            </a>
            {count > 0 && <button type="button" className="drawer__clear" onClick={clear}>{t.cart.clear}</button>}
          </div>
        </aside>
      </div>
    </>
  )
}

export function Toast() {
  const { t } = useLang()
  const { toast, setDrawer } = useStore()
  if (!toast) return null
  const label = toast === 'kit' ? t.kits.add : `RUTIM ${byModel[toast]?.name}`
  return (
    <div className="toast" role="status">
      <Icon name="check" size={18} strokeWidth={2.4} /> <span>{label}</span>
      <button type="button" onClick={() => setDrawer(true)}>{t.cart.btn} →</button>
    </div>
  )
}

export function MobileBar() {
  const { t } = useLang()
  return (
    <div className="mobile-bar">
      <a className="btn btn--tg" href={telegramLink(t.lead.tgMsg)} target="_blank" rel="noopener"><Icon name="telegram" size={18} /> {t.mobile.tg}</a>
      <a className="btn btn--primary" href="#lead" onClick={(e) => { e.preventDefault(); scrollToId('lead') }}>{t.mobile.lead}</a>
    </div>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src="/brand/logo-light.png" alt="RUTIM electric" width="150" height="41" loading="lazy" />
          <p>{t.footer.about}</p>
        </div>
        <div>
          <h4>{t.footer.contacts}</h4>
          <ul>
            <li><a href={telegramLink()} target="_blank" rel="noopener"><Icon name="telegram" size={16} /> @{CONFIG.telegramUsername}</a></li>
            {CONFIG.phone && <li><a href={phoneHref()}><Icon name="phone" size={16} /> {CONFIG.phone}</a></li>}
            <li><a href={CONFIG.uzumShop} target="_blank" rel="noopener"><Icon name="bag" size={16} /> {t.footer.uzum}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t.footer.company}</h4>
          <ul>
            <li>{CONFIG.company}</li>
            <li>{t.footer.inn}: {CONFIG.inn}</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="footer__bottom">© {new Date().getFullYear()} RUTIM electric. {t.footer.rights}</div>
      </div>
    </footer>
  )
}
