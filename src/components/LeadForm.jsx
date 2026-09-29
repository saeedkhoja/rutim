import { useState } from 'react'
import { useLang } from '../i18n'
import { scrollToId, useStore } from '../store'
import { CONFIG, phoneHref, telegramLink } from '../config'
import { itemsList, leadText, sendLead, utm } from '../lead'
import { byModel } from '../data/products'
import Icon from './Icon'

const fmtPhone = (d) => {
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return p.join(' ')
}

export default function LeadForm() {
  const { t, lang } = useLang()
  const { items, count, payModel, setPayModel, setQty, clear } = useStore()
  const [name, setName] = useState('')
  const [digits, setDigits] = useState('')
  const [shop, setShop] = useState('')
  const [hp, setHp] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | ok | fail

  const phone = digits ? `+998 ${fmtPhone(digits)}` : ''
  const data = { name: name.trim(), phone, shop: shop.trim(), payModel, items }
  const msg = leadText(t, data)
  const list = itemsList(items)

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (name.trim().length < 2) err.name = t.lead.errName
    if (digits.length !== 9) err.phone = t.lead.errPhone
    setErrors(err)
    if (Object.keys(err).length) {
      document.getElementById(err.name ? 'lf-name' : 'lf-phone')?.focus()
      return
    }
    if (hp) { setStatus('ok'); return }
    setStatus('sending')
    try {
      await sendLead({
        name: data.name, phone, shop: data.shop, payModel: t.lead.models[payModel],
        items: list, lang, page: location.href, utm: utm(),
      })
      setStatus('ok')
      clear()
    } catch {
      setStatus('fail')
      try { await navigator.clipboard.writeText(msg) } catch {}
    }
  }

  return (
    <section className="section lead" id="lead">
      <div className="container lead__grid">
        <div className="lead__intro">
          <p className="kicker">{t.lead.kicker}</p>
          <h2>{t.lead.title}</h2>
          <p className="sec-head__lead">{t.lead.lead}</p>

          <div className="tg-card">
            <span className="tg-card__icon"><Icon name="telegram" size={30} /></span>
            <div>
              <h3>{t.lead.tgTitle}</h3>
              <p>{t.lead.tgText}</p>
              <a className="btn btn--tg" href={telegramLink(msg)} target="_blank" rel="noopener">
                <Icon name="telegram" size={18} /> @{CONFIG.telegramUsername}
              </a>
            </div>
          </div>
          <p className="lead__nextTitle">{t.lead.nextTitle}</p>
          <ol className="lead__next">
            {t.lead.next.map((s) => <li key={s}>{s}</li>)}
          </ol>
          {CONFIG.phone && (
            <a className="lead__phone" href={phoneHref()}><Icon name="phone" size={18} /> {CONFIG.phone}</a>
          )}
        </div>

        <div className="form-card">
          {status === 'ok' ? (
            <div className="form-state">
              <span className="form-state__icon form-state__icon--ok"><Icon name="check" size={32} strokeWidth={2.4} /></span>
              <h3>{t.lead.okTitle}</h3>
              <p>{t.lead.okText}</p>
              <div className="form-state__actions">
                <a className="btn btn--tg" href={telegramLink(t.lead.tgMsg)} target="_blank" rel="noopener"><Icon name="telegram" size={18} /> Telegram</a>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>{t.lead.again}</button>
              </div>
            </div>
          ) : status === 'fail' ? (
            <div className="form-state">
              <span className="form-state__icon form-state__icon--warn"><Icon name="telegram" size={30} /></span>
              <h3>{t.lead.failTitle}</h3>
              <p>{t.lead.failText}</p>
              <pre className="form-state__msg">{msg}</pre>
              <div className="form-state__actions">
                <a className="btn btn--tg" href={telegramLink(msg)} target="_blank" rel="noopener"><Icon name="telegram" size={18} /> {t.lead.failBtn}</a>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>←</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="lf-name">{t.lead.name} *</label>
                <input id="lf-name" autoComplete="name" value={name} placeholder={t.lead.namePh} maxLength={60}
                  onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="lf-name-err" />
                {errors.name && <span className="field__err" id="lf-name-err">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="lf-phone">{t.lead.phone} *</label>
                <div className="phone">
                  <span>+998</span>
                  <input id="lf-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67"
                    value={fmtPhone(digits)} aria-invalid={!!errors.phone} aria-describedby="lf-phone-err"
                    onChange={(e) => {
                      let d = e.target.value.replace(/\D/g, '')
                      if (d.startsWith('998') && d.length > 9) d = d.slice(3)
                      setDigits(d.slice(0, 9))
                    }} />
                </div>
                {errors.phone && <span className="field__err" id="lf-phone-err">{errors.phone}</span>}
              </div>
              <div className="field">
                <label htmlFor="lf-shop">{t.lead.shop}</label>
                <input id="lf-shop" value={shop} placeholder={t.lead.shopPh} maxLength={120} onChange={(e) => setShop(e.target.value)} />
              </div>
              <fieldset className="field">
                <legend>{t.lead.model}</legend>
                <div className="radios">
                  {Object.entries(t.lead.models).map(([id, label]) => (
                    <label key={id} className={`radio ${payModel === id ? 'is-active' : ''}`}>
                      <input type="radio" name="pay" value={id} checked={payModel === id} onChange={() => setPayModel(id)} />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <span className="field__label">{t.lead.list} {count > 0 && <em>· {count} {t.cart.pcs}</em>}</span>
                {list.length ? (
                  <ul className="lead__items">
                    {Object.entries(items).map(([m, q]) => (
                      <li key={m}>
                        <span>RUTIM {byModel[m]?.name || m}</span>
                        <span className="lead__qty">× {q}</span>
                        <button type="button" onClick={() => setQty(m, 0)} aria-label={t.cart.remove}><Icon name="x" size={16} /></button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="lead__empty">
                    {t.lead.listEmpty}{' '}
                    <a href="#catalog" onClick={(e) => { e.preventDefault(); scrollToId('catalog') }}>{t.lead.toCatalog} →</a>
                  </p>
                )}
              </div>

              <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true" name="website" />

              <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? t.lead.sending : t.lead.submit} <Icon name="arrow" size={18} />
              </button>
              <p className="form__consent">{t.lead.consent}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
