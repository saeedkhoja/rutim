import { T } from '../copy'
import { useLead } from '../store'
import { PRODUCTS, SERIES, fitKey, powerLabel } from '../data/products'
import Icon from './Icon'
import { Head } from './Sections'

function ProductCard({ p, onOpen }) {
  const { requestLead } = useLead()
  return (
    <article className="card">
      <button type="button" className="card__media" onClick={() => onOpen(p.model)} aria-label={`RUTIM ${p.name} — rasmlar va xususiyatlar`}>
        <img src={p.images[0].sm} alt={`RUTIM ${p.name}`} loading="lazy" width="480" height="640" />
        <span className="card__power">{powerLabel(p.va)}</span>
        <span className={`tag tag--${p.series} card__series`}>{p.series}</span>
      </button>
      <div className="card__body">
        <button type="button" className="card__name" onClick={() => onOpen(p.model)}>{p.name}</button>
        <span className="card__fit">{T.fit[fitKey(p.va)]}</span>
        <span className="card__price">{T.products.price}</span>
        <button type="button" className="btn btn--primary btn--sm btn--block card__cta" onClick={() => requestLead({ model: p.model })}>
          {T.products.cta}
        </button>
      </div>
    </article>
  )
}

// Barcha modellar bitta ro‘yxatda: seriya tartibida, har bir seriya ichida quvvat bo‘yicha
const LIST = [...PRODUCTS].sort((a, b) => SERIES.indexOf(a.series) - SERIES.indexOf(b.series) || a.va - b.va)

export default function Products({ onOpen }) {
  return (
    <section className="section products" id="products">
      <div className="container">
        <Head kicker={T.products.kicker} title={T.products.title} lead={T.products.lead} />
        <div className="pgrid">
          {LIST.map((p) => <ProductCard key={p.model} p={p} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  )
}
