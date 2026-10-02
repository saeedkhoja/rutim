import { useLang } from '../i18n'
import { useLead } from '../store'
import { PRODUCTS, SERIES, fitKey, powerLabel } from '../data/products'
import Icon from './Icon'

function ProductCard({ p, onOpen }) {
  const { t } = useLang()
  return (
    <button type="button" className="card" onClick={() => onOpen(p.model)}>
      <span className="card__media">
        <img src={p.images[0].sm} alt={`RUTIM ${p.name}`} loading="lazy" width="480" height="640" />
        <span className="card__power">{powerLabel(p.va)}</span>
        <span className={`tag tag--${p.series} card__series`}>{p.series}</span>
      </span>
      <span className="card__body">
        <span className="card__name">{p.name}</span>
        <span className="card__fit">{t.fit[fitKey(p.va)]}</span>
        <span className="card__more">{t.products.more} <Icon name="arrow" size={15} /></span>
      </span>
    </button>
  )
}

// Barcha modellar bitta ro‘yxatda: seriya tartibida, har bir seriya ichida quvvat bo‘yicha
const LIST = [...PRODUCTS].sort((a, b) => SERIES.indexOf(a.series) - SERIES.indexOf(b.series) || a.va - b.va)

export default function Products({ onOpen }) {
  const { t } = useLang()
  const { openLead } = useLead()

  return (
    <section className="section products" id="products">
      <div className="container">
        <div className="sec-head">
          <p className="kicker">{t.products.kicker}</p>
          <h2>{t.products.title}</h2>
          <p className="sec-head__lead">{t.products.lead}</p>
        </div>

        <div className="pgrid">
          {LIST.map((p) => <ProductCard key={p.model} p={p} onOpen={onOpen} />)}
        </div>

        <div className="products__foot">
          <p>{t.products.priceNote}</p>
          <button type="button" className="btn btn--primary" onClick={() => openLead()}>
            {t.products.cta} <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
