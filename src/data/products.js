import raw from '../../data/products.json'

const displayModel = (m) => m.replace(/KVA$/, 'kVA')

export const powerLabel = (va) =>
  va >= 5000 ? `${va / 1000} kVA` : `${va.toLocaleString('ru-RU')} VA`

export const PRODUCTS = raw.products.map((p) => ({
  id: p.id,
  model: p.model,
  name: displayModel(p.model),
  series: p.series,
  va: p.powerVA,
  input: p.input.replace(' В', ' V'),
  output: p.output.replace(' В', ' V'),
  uzumUrl: p.url.replace('/ru/', '/uz/'),
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

export const POWER_GROUPS = [
  { id: 'home', min: 0, max: 3000 },
  { id: 'office', min: 5000, max: 10000 },
  { id: 'pro', min: 15000, max: Infinity },
]

// Tavsiya etilgan boshlang‘ich to‘plamlar (model → dona)
export const KITS = [
  {
    id: 'home',
    items: { 'RRC95-500VA': 2, 'RRC95-1000VA': 2, 'RRC95-1500VA': 2, 'RRC95-2000VA': 2, 'RRC95-3000VA': 2 },
  },
  {
    id: 'office',
    items: { 'RRC95-5KVA': 2, 'RRC95-10KVA': 2, 'RRC45-5KVA': 2, 'RRC45-10KVA': 2 },
  },
  {
    id: 'pro',
    items: {
      'RRC95-15KVA': 1, 'RRC95-20KVA': 1, 'RRC45-20KVA': 1, 'RRC45-30KVA': 1,
      'RTC-15KVA': 1, 'RTC-20KVA': 1, 'RTC-30KVA': 1,
    },
  },
]

// Quvvat kalkulyatori uchun taxminiy iste’mol (Vt). k — ishga tushish zaxirasi (kompressor/dvigatel).
export const APPLIANCES = [
  { id: 'fridge', w: 300, k: 2.5 },
  { id: 'tv', w: 150, k: 1 },
  { id: 'pc', w: 400, k: 1 },
  { id: 'ac9', w: 1000, k: 1.5 },
  { id: 'ac18', w: 1800, k: 1.5 },
  { id: 'washer', w: 2000, k: 1.3 },
  { id: 'boiler', w: 2000, k: 1 },
  { id: 'pump', w: 750, k: 3 },
  { id: 'tools', w: 1500, k: 1.5 },
]
