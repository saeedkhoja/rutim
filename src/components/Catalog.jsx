import { useMemo, useState } from 'react'
import { useLang } from '../i18n'
import { useStore } from '../store'
import { POWER_GROUPS, PRODUCTS, SERIES, powerLabel, seriesRange } from '../data/products'
import Icon from './Icon'

export function ProductCard({ p, onOpen }) {
  const { t } = useLang()
  const { items, add } = useStore()
  const inList = items[p.model] > 0
  return (
    <article className="card">
      <button type="button" className="card__media" onClick={() => onOpen(p.model)} aria-label={`${t.catalog.details}: ${p.name}`}>
        <img src={p.images[0].sm} alt={`RUTIM ${p.name}`} loading="lazy" width="480" height="640" />
        <span className={`tag tag--${p.series}`}><span className="tag__s">{p.series} ·&nbsp;</span>{t.series[p.series].tag}</span>
        <span className="card__photos"><Icon name="camera" size={14} /> {p.images.length}</span>
      </button>
      <div className="card__body">
        <div className="card__title">
          <h3>{p.name}</h3>
          <b>{powerLabel(p.va)}</b>
        </div>
        <dl className="card__specs">
          <div><dt>{t.catalog.input}</dt><dd>{p.input}</dd></div>
          <div><dt>{t.catalog.output}</dt><dd>{p.output}</dd></div>
          <div><dt>{t.catalog.type}</dt><dd>{t.series[p.series].type}</dd></div>
        </dl>
        <div className="card__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => onOpen(p.model)}>{t.catalog.details}</button>
          <button type="button" className={`btn btn--sm ${inList ? 'btn--done' : 'btn--primary'}`} onClick={() => add(p.model)}>
            <Icon name={inList ? 'check' : 'plus'} size={16} strokeWidth={2.4} />
            {inList ? `${t.catalog.added} · ${items[p.model]}` : t.catalog.add}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Catalog({ onOpen }) {
  const { t } = useLang()
  const [series, setSeries] = useState('all')
  const [power, setPower] = useState('all')

  const list = useMemo(() => {
    const g = POWER_GROUPS.find((x) => x.id === power)
    return PRODUCTS
      .filter((p) => series === 'all' || p.series === series)
      .filter((p) => !g || (p.va >= g.min && p.va <= g.max))
      .sort((a, b) => SERIES.indexOf(a.series) - SERIES.indexOf(b.series) || a.va - b.va)
  }, [series, power])

  return (
    <section className="section catalog" id="catalog">
      <div className="container">
        <div className="sec-head">
          <p className="kicker">{t.catalog.kicker}</p>
          <h2>{t.catalog.title}</h2>
          <p className="sec-head__lead">{t.catalog.lead}</p>
        </div>

        <div className="series-cards">
          {SERIES.map((s) => (
            <button key={s} type="button" className={`series-card ${series === s ? 'is-active' : ''}`}
              onClick={() => setSeries(series === s ? 'all' : s)} aria-pressed={series === s}>
              <span className={`tag tag--${s}`}>{t.series[s].tag}</span>
              <b>{s}</b>
              <span className="series-card__type">{t.series[s].type} · {seriesRange(s)}</span>
              <p>{t.series[s].short}</p>
            </button>
          ))}
        </div>

        <div className="filters">
          <div className="chips" role="group" aria-label={t.catalog.all}>
            <button type="button" className={series === 'all' ? 'is-active' : ''} onClick={() => setSeries('all')}>{t.catalog.all}</button>
            {SERIES.map((s) => (
              <button key={s} type="button" className={series === s ? 'is-active' : ''} onClick={() => setSeries(s)}>{s}</button>
            ))}
          </div>
          <div className="chips" role="group" aria-label={t.catalog.allPower}>
            <button type="button" className={power === 'all' ? 'is-active' : ''} onClick={() => setPower('all')}>{t.catalog.allPower}</button>
            {POWER_GROUPS.map((g) => (
              <button key={g.id} type="button" className={power === g.id ? 'is-active' : ''} onClick={() => setPower(g.id)}>{t.catalog.power[g.id]}</button>
            ))}
          </div>
          <span className="filters__count">{list.length} {t.catalog.found}</span>
        </div>

        {list.length ? (
          <div className="grid">
            {list.map((p) => <ProductCard key={p.model} p={p} onOpen={onOpen} />)}
          </div>
        ) : (
          <p className="empty">{t.catalog.empty}</p>
        )}
      </div>
    </section>
  )
}
