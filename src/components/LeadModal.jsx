import { useEffect, useRef, useState } from 'react'
import { DICTS, useLang } from '../i18n'
import { useLead } from '../store'
import { CONFIG, phoneHref } from '../config'
import { sendLead, utm } from '../lead'
import { track } from '../pixel'
import { CITIES } from '../data/cities'
import { byModel } from '../data/products'
import { LEAD_TYPES } from './Sections'
import Icon from './Icon'

const fmtPhone = (d) => [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ')

const EMPTY = { name: '', digits: '', shop: '', city: '', type: '' }
const ORDER = ['name', 'digits', 'shop', 'city', 'type']

export default function LeadModal() {
  const { t, lang } = useLang()
  const { lead, closeLead } = useLead()
  const ref = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [model, setModel] = useState('')
  const [errors, setErrors] = useState({})
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | fail
  const L = t.lead

  // Ochilganda: oldindan tanlangan tur/modelni qo‘yamiz. Kiritilgan ma’lumotlar yopilganda saqlanib qoladi.
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (lead) {
      if (lead.type) setForm((f) => ({ ...f, type: lead.type }))
      setModel(lead.model || '')
      if (!d.open) d.showModal()
      document.body.classList.add('no-scroll')
    } else if (d.open) {
      d.close()
    }
  }, [lead])

  const onClose = () => {
    document.body.classList.remove('no-scroll')
    if (status === 'ok') { setForm(EMPTY); setModel(''); setStatus('idle') }
    if (status === 'fail') setStatus('idle')
    setErrors({})
    closeLead()
  }

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const phone = `+998 ${fmtPhone(form.digits)}`

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (form.name.trim().length < 2) err.name = L.errName
    if (form.digits.length !== 9) err.digits = L.errPhone
    if (form.shop.trim().length < 2) err.shop = L.errShop
    if (!form.city) err.city = L.errCity
    if (!form.type) err.type = L.errType
    setErrors(err)
    const first = ORDER.find((k) => err[k])
    if (first) {
      document.getElementById(`lf-${first}`)?.focus()
      return
    }
    if (hp) { setStatus('ok'); return }

    setStatus('sending')
    const uz = DICTS.uz.lead
    try {
      await sendLead({
        name: form.name.trim(),
        phone,
        shop: form.shop.trim(),
        city: CITIES.find((c) => c.id === form.city)?.uz || form.city,
        type: uz.types[form.type],
        model: model ? byModel[model]?.name || model : '',
        lang, page: location.href, utm: utm(),
      })
      setStatus('ok')
      track('Lead', { content_name: form.type })
    } catch {
      setStatus('fail')
    }
  }

  return (
    <dialog ref={ref} className="sheet" onClose={onClose} aria-labelledby="lf-title"
      onClick={(e) => { if (e.target === ref.current) ref.current.close() }}>
      <div className="sheet__box">
        <button type="button" className="sheet__close" onClick={() => ref.current.close()} aria-label={t.modal.close}>
          <Icon name="x" size={22} />
        </button>

        {status === 'ok' ? (
          <div className="form-state">
            <span className="form-state__icon"><Icon name="check" size={34} strokeWidth={2.4} /></span>
            <h3>{L.okTitle}</h3>
            <p>{L.okText.replace('{phone}', phone)}</p>
            <button type="button" className="btn btn--primary btn--lg btn--block" onClick={() => ref.current.close()}>{L.okClose}</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3 id="lf-title" className="sheet__title">{L.title}</h3>
            <p className="sheet__sub">{L.sub}</p>

            {model && byModel[model] && (
              <div className="sheet__model">
                <img src={byModel[model].images[0].sm} alt="" width="480" height="640" />
                <span><small>{L.model}</small>RUTIM {byModel[model].name}</span>
                <button type="button" onClick={() => setModel('')} aria-label="×"><Icon name="x" size={16} /></button>
              </div>
            )}

            <div className="field">
              <label htmlFor="lf-name">{L.name}</label>
              <input id="lf-name" autoComplete="name" value={form.name} placeholder={L.namePh} maxLength={60}
                onChange={(e) => set('name')(e.target.value)} aria-invalid={!!errors.name} />
              {errors.name && <span className="field__err">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="lf-digits">{L.phone}</label>
              <div className="phone">
                <span>+998</span>
                <input id="lf-digits" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67"
                  value={fmtPhone(form.digits)} aria-invalid={!!errors.digits}
                  onChange={(e) => {
                    let d = e.target.value.replace(/\D/g, '')
                    if (d.startsWith('998') && d.length > 9) d = d.slice(3)
                    set('digits')(d.slice(0, 9))
                  }} />
              </div>
              {errors.digits && <span className="field__err">{errors.digits}</span>}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="lf-shop">{L.shop}</label>
                <input id="lf-shop" value={form.shop} placeholder={L.shopPh} maxLength={120}
                  onChange={(e) => set('shop')(e.target.value)} aria-invalid={!!errors.shop} />
                {errors.shop && <span className="field__err">{errors.shop}</span>}
              </div>
              <div className="field">
                <label htmlFor="lf-city">{L.city}</label>
                <div className="select">
                  <select id="lf-city" value={form.city} onChange={(e) => set('city')(e.target.value)}
                    aria-invalid={!!errors.city} className={form.city ? '' : 'is-empty'}>
                    <option value="" disabled>{L.cityPh}</option>
                    {CITIES.map((c) => <option key={c.id} value={c.id}>{c[lang]}</option>)}
                  </select>
                  <Icon name="chevron" size={18} />
                </div>
                {errors.city && <span className="field__err">{errors.city}</span>}
              </div>
            </div>

            <fieldset className="field">
              <legend>{L.type}</legend>
              <div className="types" aria-invalid={!!errors.type}>
                {LEAD_TYPES.map((id, i) => (
                  <label key={id} className={`type ${form.type === id ? 'is-active' : ''}`}>
                    <input type="radio" name="lf-type" id={i === 0 ? 'lf-type' : undefined} value={id}
                      checked={form.type === id} onChange={() => set('type')(id)} />
                    <span className="type__dot" />
                    <span><b>{L.types[id]}</b><small>{L.typeHints[id]}</small></span>
                  </label>
                ))}
              </div>
              {errors.type && <span className="field__err">{errors.type}</span>}
            </fieldset>

            <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} aria-hidden="true" name="website" />

            {status === 'fail' && (
              <p className="form-fail" role="alert">
                {L.fail}
                {CONFIG.phone && <> {L.failCall} <a href={phoneHref()}>{CONFIG.phone}</a></>}
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
              {status === 'sending' ? L.sending : L.submit} <Icon name="arrow" size={18} />
            </button>
            <p className="form__consent">{L.consent}</p>
          </form>
        )}
      </div>
    </dialog>
  )
}
