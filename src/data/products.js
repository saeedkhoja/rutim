import raw from '../../data/products.json'

const displayModel = (m) => m.replace(/KVA$/, 'kVA')

export const powerLabel = (va) =>
  va >= 5000 ? `${va / 1000} kVA` : `${va.toLocaleString('ru-RU')} VA`

// Quvvatga qarab "kimga mos" (t.fit kaliti)
export const fitKey = (va) => (va <= 1000 ? 's' : va <= 3000 ? 'm' : va <= 10000 ? 'l' : 'xl')

export const PRODUCTS = raw.products.map((p) => ({
  id: p.id,
  model: p.model,
  name: displayModel(p.model),
  series: p.series,
  va: p.powerVA,
  input: p.input.replace(' В', ' V'),
  output: p.output.replace(' В', ' V'),
  images: p.images.map((_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return { sm: `/products/${p.model}/${n}-sm.webp`, lg: `/products/${p.model}/${n}.webp` }
  }),
}))

export const byModel = Object.fromEntries(PRODUCTS.map((p) => [p.model, p]))

export const SERIES = ['RRC95', 'RRC45', 'RTC']

export const seriesRange = (s) => {
  const nums = PRODUCTS.filter((p) => p.series === s).flatMap((p) => p.input.match(/\d+/g).map(Number))
  return `${Math.min(...nums)}–${Math.max(...nums)} V`
}
