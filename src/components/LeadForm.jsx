import { useEffect, useState } from 'react'
import { T } from '../copy'
import { useLead } from '../store'
import { CONFIG, phoneHref } from '../config'
import { getUtm, sendLead } from '../lead'
import { track } from '../pixel'
import { CITIES } from '../data/cities'
import { byModel } from '../data/products'
import Icon from './Icon'

const fmtPhone = (d) => [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ')

const EMPTY = { name: '', digits: '', city: '', shopType: '' }
const ORDER = ['name', 'digits', 'city']

function Select({ id, value, onChange, options, placeholder, invalid }) {
  return (
    <div className="select">
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid}
        className={value ? '' : 'is-empty'}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icon name="chevron" size={18} />
    </div>
  )
}

const CITY_OPTS = CITIES.map((c) => ({ value: c.id, label: c.uz }))
const SHOP_OPTS = T.lead.shopTypes.map((s) => ({ value: s, label: s }))

export default function LeadForm() {
  const { prefill } = useLead()
  const [form, setForm] = useState(EMPTY)
  const [model, setModel] = useState('')
  const [errors, setErrors] = useState({})
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | fail
  const L = T.lead

  // Katalog/kalkulyator tugmasidan kelganda — modelni oldindan qo‘yamiz
  useEffect(() => {
    if (!prefill) return
    if (prefill.model) setModel(prefill.model)
    if (status !== 'sending') setStatus('idle')
  }, [prefill]) // eslint-disable-line react-hooks/exhaustive-deps

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
    if (!form.city) err.city = L.errCity
    setErrors(err)
    const first = ORDER.find((k) => err[k])
    if (first) {
      document.getElementById(`lf-${first}`)?.focus()
      return
    }
    if (hp) { setStatus('ok'); return }

    setStatus('sending')
    const city = CITIES.find((c) => c.id === form.city)?.uz || form.city
    try {
      await sendLead({
        name: form.name.trim(),
        phone,
        city,
        shopType: form.shopType,
        model: model ? byModel[model]?.name || model : '',
        page: location.href,
        utm: getUtm(),
        // VITE_LEAD_ENDPOINT dagi eski backend shu maydonlarni majburiy talab qiladi
        shop: form.shopType || 'Ko‘rsatilmagan',
        type: 'Diler narxi',
        lang: 'uz',
      })
      setStatus('ok')
      track('Lead', { content_name: model || 'Diler narxi' })
    } catch {
      setStatus('fail')
    }
  }

  const again = () => {
    setForm(EMPTY)
    setModel('')
    setStatus('idle')
  }

  return (
    <section className="lead" id="lead">
      <div className="container">
        <div className="lead__box">
          <div className="lead__copy">
            <h2>{L.title}</h2>
            <p className="lead__sub"><Icon name="phone" size={18} /> {L.sub}</p>
            <ul className="lead__perks">
              {L.perks.map((p) => <li key={p}><Icon name="check" size={16} strokeWidth={2.6} /> {p}</li>)}
            </ul>
            <div className="lead__media" aria-hidden="true">
              <img src="/products/RRC95-3000VA/01-sm.webp" alt="" loading="lazy" width="480" height="640" />
              <img src="/products/RRC45-10KVA/01-sm.webp" alt="" loading="lazy" width="480" height="640" />
            </div>
          </div>

          <div className="lead__card">
            {status === 'ok' ? (
              <div className="form-state" role="status">
                <span className="form-state__icon"><Icon name="check" size={34} strokeWidth={2.4} /></span>
                <h3>{L.okTitle}</h3>
                <p>{L.okText.replace('{phone}', phone)}</p>
                <button type="button" className="btn btn--dark btn--block" onClick={again}>{L.okAgain}</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                {model && byModel[model] && (
                  <div className="sheet__model">
                    <img src={byModel[model].images[0].sm} alt="" width="480" height="640" />
                    <span><small>{L.model}</small>RUTIM {byModel[model].name}</span>
                    <button type="button" onClick={() => setModel('')} aria-label="Modelni olib tashlash"><Icon name="x" size={16} /></button>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="lf-name">{L.name} <i>*</i></label>
                  <input id="lf-name" autoComplete="name" value={form.name} placeholder={L.namePh} maxLength={60}
                    onChange={(e) => set('name')(e.target.value)} aria-invalid={!!errors.name} />
                  {errors.name && <span className="field__err">{errors.name}</span>}
                </div>

                <div className="field">
                  <label htmlFor="lf-digits">{L.phone} <i>*</i></label>
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

                <div className="field">
                  <label htmlFor="lf-city">{L.city} <i>*</i></label>
                  <Select id="lf-city" value={form.city} onChange={set('city')} options={CITY_OPTS}
                    placeholder={L.choose} invalid={!!errors.city} />
                  {errors.city && <span className="field__err">{errors.city}</span>}
                </div>

                <div className="field">
                  <label htmlFor="lf-shop">{L.shopType}</label>
                  <Select id="lf-shop" value={form.shopType} onChange={set('shopType')} options={SHOP_OPTS} placeholder={L.choose} />
                </div>

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
        </div>
      </div>
    </section>
  )
}
