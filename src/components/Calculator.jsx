import { useState } from 'react'
import { T } from '../copy'
import { CALC_DEFAULT_MODEL, PRICES, som } from '../config'
import { byModel, powerLabel } from '../data/products'
import { useLead } from '../store'
import Icon from './Icon'
import { Head } from './Sections'

const OPTIONS = PRICES.filter((p) => byModel[p.model])

export default function Calculator() {
  const { requestLead } = useLead()
  const [model, setModel] = useState(byModel[CALC_DEFAULT_MODEL] ? CALC_DEFAULT_MODEL : OPTIONS[0].model)
  const [units, setUnits] = useState(10)
  const C = T.calc

  const price = OPTIONS.find((p) => p.model === model)
  const hasPrice = price.dealerPrice > 0 && price.retailPrice > 0
  const perUnit = price.retailPrice - price.dealerPrice
  const p = byModel[model]

  return (
    <section className="section calc" id="calc">
      <div className="container">
        <Head kicker={C.kicker} title={C.title} lead={C.lead} />

        <div className="calc__box">
          <div className="calc__inputs">
            <div className="field">
              <label htmlFor="calc-model">{C.model}</label>
              <div className="select">
                <select id="calc-model" value={model} onChange={(e) => setModel(e.target.value)}>
                  {OPTIONS.map((o) => (
                    <option key={o.model} value={o.model}>RUTIM {byModel[o.model].name} · {powerLabel(byModel[o.model].va)}</option>
                  ))}
                </select>
                <Icon name="chevron" size={18} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="calc-units" className="calc__units-label">
                {C.units} <output htmlFor="calc-units">{units} {C.unitsSuffix}</output>
              </label>
              <input id="calc-units" type="range" min="1" max="100" step="1" value={units} className="range"
                style={{ '--fill': `${((units - 1) / 99) * 100}%` }}
                onChange={(e) => setUnits(Number(e.target.value))} />
              <div className="range__scale" aria-hidden="true"><span>1</span><span>50</span><span>100</span></div>
            </div>

            <div className="calc__product">
              <img src={p.images[0].sm} alt="" width="480" height="640" loading="lazy" />
              <span><b>RUTIM {p.name}</b><small>{powerLabel(p.va)}</small></span>
            </div>
          </div>

          <div className="calc__out" aria-live="polite">
            {hasPrice ? (
              <>
                <dl className="calc__rows">
                  <div><dt>{C.dealer}</dt><dd>{som(price.dealerPrice)}</dd></div>
                  <div><dt>{C.retail}</dt><dd>{som(price.retailPrice)}</dd></div>
                  <div><dt>{C.perUnit}</dt><dd className="is-plus">+{som(perUnit)}</dd></div>
                </dl>
                <div className="calc__total">
                  <small>{C.monthly} · {units} {C.unitsSuffix}</small>
                  <b>{som(perUnit * units)}</b>
                </div>
                <p className="calc__note">{C.note}</p>
              </>
            ) : (
              <div className="calc__empty">
                <span className="calc__empty-icon"><Icon name="calc" size={28} /></span>
                <b>{C.onRequest}</b>
                <p>{C.onRequestText}</p>
              </div>
            )}
            <button type="button" className="btn btn--light btn--block" onClick={() => requestLead({ model })}>
              {C.cta} <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
