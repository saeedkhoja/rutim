import { createContext, useContext, useEffect, useState } from 'react'

const uz = {
  meta: {
    title: 'RUTIM — do‘konlar uchun stabilizatorlar: sotuvdan keyin to‘lov',
    description:
      'Do‘kon va biznes egalariga taklif: RUTIM stabilizatorlarini oldindan pulsiz oling — sotuvdan keyin to‘lov yoki nasiya. 18 model, 500 VA – 30 kVA.',
  },
  nav: { offer: 'Hamkorlik', products: 'Mahsulotlar', who: 'Kimga foydali', cta: 'Ariza qoldirish' },
  hero: {
    eyebrow: 'Do‘kon va biznes egalariga taklif',
    title1: 'Stabilizatorlarni oldindan pulsiz oling —',
    title2: 'sotganingizdan keyin to‘laysiz',
    lead: 'RUTIM kuchlanish stabilizatorlarini do‘koningizga rasmiy shartnoma asosida beramiz.',
    points: [
      { t: 'Sotuvdan keyin to‘lov', d: 'Oldindan 0 so‘m' },
      { t: 'Nasiya — muddatli to‘lov', d: 'Bo‘lib to‘lash mumkin' },
      { t: 'Turli xil stabilizatorlar', d: '18 model · 500 VA – 30 kVA' },
    ],
    cta: 'Ariza qoldirish',
    note: '1 daqiqa · Menejer o‘zi qo‘ng‘iroq qiladi',
    monitorTitle: 'Tarmoq monitori',
    monitorIn: 'Kirish',
    monitorOut: 'Chiqish',
    monitorCaption: 'Tarmoq sakraydi. Texnika — himoyada.',
  },
  offer: {
    kicker: 'Hamkorlik turlari',
    title: 'O‘zingizga qulay usulni tanlang',
    hot: 'Eng qulay',
    items: {
      after: 'Tovarni beramiz — sotilganidan keyin hisob-kitob qilasiz.',
      nasiya: 'Tovarni hozir olasiz, to‘lovni kelishilgan muddatda qilasiz.',
      wholesale: 'Katta hajmda olsangiz — alohida narx va shartlar.',
      consult: 'Qaysi biri mos — bilmasangiz, menejer tushuntirib beradi.',
    },
    pick: 'Tanlash',
    contract: 'Barcha shartlar rasmiy shartnomada yoziladi',
  },
  products: {
    kicker: 'Mahsulotlar',
    title: 'Har bir mijozga mos stabilizator',
    lead: '18 model, 500 VA dan 30 kVA gacha. Modelni bosing — rasmlar va xususiyatlarini ko‘rasiz.',
    more: 'Batafsil',
    priceNote: 'Hamkorlik narxlari to‘lov turi va hajmga bog‘liq — menejer arizadan keyin aytadi.',
    cta: 'Narxlarni bilish',
    fitFor: 'Kimga',
  },
  fit: {
    s: 'Muzlatgich, TV, kompyuter',
    m: 'Konditsioner, kir yuvish mashinasi',
    l: 'Butun kvartira yoki ofis',
    xl: 'Hovli uy, ustaxona, sex',
  },
  series: {
    RRC95: { tag: 'Universal', type: 'Relelik', short: 'Eng ommabop seriya: xonadon, ofis va do‘konlar uchun.' },
    RRC45: { tag: 'Past kuchlanish', type: 'Relelik', short: 'Kuchlanish juda past tushadigan hududlar uchun — 45 V dan ishlaydi.' },
    RTC: { tag: 'Aniq ±5%', type: 'Avtomatik (AVR)', short: 'Sezgir texnika va ishlab chiqarish uskunalari uchun.' },
  },
  who: {
    kicker: 'Kimga foydali',
    title: 'Stabilizator har bir uy va biznesga kerak',
    lead: 'Kuchlanish sakrashi texnikani buzadi — shuning uchun stabilizatorga talab yil bo‘yi bor.',
    items: [
      { t: 'Xonadonlar', d: 'Muzlatgich, konditsioner, televizor', p: '0,5–3 kVA' },
      { t: 'Butun uy va ofis', d: 'Kvartira, ofis, do‘kon', p: '5–10 kVA' },
      { t: 'Ustaxona va sex', d: 'Hovli uy, kuchli uskunalar', p: '15–30 kVA' },
      { t: 'Past kuchlanishli hudud', d: 'Tarmoq 45 V gacha tushadigan joylar', p: 'RRC45' },
    ],
    sellersTitle: 'Hamkorlik kimlar uchun:',
    sellers: ['Elektr tovarlari do‘konlari', 'Maishiy texnika do‘konlari', 'Qurilish mollari do‘konlari', 'Konditsioner ustalari', 'Onlayn sotuvchilar'],
  },
  how: {
    kicker: 'Qanday ishlaydi',
    title: '3 qadam — va tovar peshtaxtangizda',
    steps: [
      { t: 'Ariza qoldirasiz', d: '1 daqiqa: ism, telefon va do‘kon.' },
      { t: 'Shartnoma tuzamiz', d: 'Menejer qo‘ng‘iroq qilib, narx va shartlarni aytadi.' },
      { t: 'Sotasiz va foyda olasiz', d: 'To‘lov — siz tanlagan usulda.' },
    ],
  },
  final: {
    title: 'Do‘koningizga stabilizator kerakmi?',
    text: 'Ariza qoldiring — menejer narxlar va shartlarni aytib beradi.',
    cta: 'Ariza qoldirish',
  },
  specs: {
    type: 'Turi',
    power: 'Quvvat',
    input: 'Kirish kuchlanishi',
    output: 'Chiqish kuchlanishi',
    display: 'Displey',
    displayV: 'Raqamli LED',
    bypass: 'Bypass rejimi',
    bypassV: 'Bor',
    protection: 'Himoya',
    protect: {
      RRC95: ['Yuqori kuchlanish', 'Past kuchlanish', 'Ortiqcha yuklama', 'Qisqa tutashuv'],
      RRC45: ['Yuqori va past kuchlanish', 'Ortiqcha yuklama', 'Qisqa tutashuv'],
      RTC: ['Yuqori kuchlanish', 'Past kuchlanish', 'Ortiqcha yuklama', 'Qisqa tutashuv', 'Qizib ketish'],
    },
  },
  modal: { close: 'Yopish', ask: 'Ariza qoldirish', askNote: 'Hamkorlik narxini menejer aytadi' },
  lead: {
    title: 'Ariza qoldirish',
    sub: 'Menejer siz bilan bog‘lanib, narx va shartlarni aytadi.',
    model: 'Model',
    name: 'Ismingiz',
    namePh: 'Masalan, Aziz',
    phone: 'Telefon raqamingiz',
    shop: 'Do‘kon nomi',
    shopPh: 'Masalan, “Elektro Mir”',
    city: 'Shahar / viloyat',
    cityPh: 'Tanlang',
    type: 'Hamkorlik turi',
    types: {
      after: 'Sotuvdan keyin to‘lov',
      nasiya: 'Nasiya',
      wholesale: 'Ulgurji xarid',
      consult: 'Alohida maslahat',
    },
    typeHints: {
      after: 'Oldindan 0 so‘m',
      nasiya: 'Muddatli to‘lov',
      wholesale: 'Alohida narx',
      consult: 'Menejer tushuntiradi',
    },
    submit: 'Arizani yuborish',
    sending: 'Yuborilmoqda…',
    consent: 'Tugmani bosib, siz bilan telefon orqali bog‘lanishimizga rozilik bildirasiz.',
    errName: 'Ismingizni kiriting',
    errPhone: 'Raqamni to‘liq kiriting: +998 XX XXX XX XX',
    errShop: 'Do‘kon nomini kiriting',
    errCity: 'Shahar yoki viloyatni tanlang',
    errType: 'Hamkorlik turini tanlang',
    fail: 'Ariza yuborilmadi. Internetni tekshirib, qayta bosing.',
    failCall: 'Yoki qo‘ng‘iroq qiling:',
    okTitle: 'Rahmat! Arizangiz qabul qilindi',
    okText: 'Menejer tez orada {phone} raqamiga qo‘ng‘iroq qiladi.',
    okClose: 'Yaxshi',
  },
  footer: {
    about: 'RUTIM electric — bir fazali kuchlanish stabilizatorlari. Do‘konlar bilan shartnoma asosida hamkorlik.',
    inn: 'STIR',
    rights: 'Barcha huquqlar himoyalangan.',
  },
}

const ru = {
  meta: {
    title: 'RUTIM — стабилизаторы для магазинов: оплата после продажи',
    description:
      'Предложение для магазинов и бизнеса: стабилизаторы RUTIM без предоплаты — оплата после продажи или рассрочка. 18 моделей, 500 ВА – 30 кВА.',
  },
  nav: { offer: 'Сотрудничество', products: 'Продукция', who: 'Кому выгодно', cta: 'Оставить заявку' },
  hero: {
    eyebrow: 'Предложение для магазинов и бизнеса',
    title1: 'Стабилизаторы без предоплаты —',
    title2: 'платите после того, как продали',
    lead: 'Передаём стабилизаторы напряжения RUTIM в ваш магазин по официальному договору.',
    points: [
      { t: 'Оплата после продажи', d: '0 сум заранее' },
      { t: 'Рассрочка — оплата частями', d: 'По согласованному графику' },
      { t: 'Разные стабилизаторы', d: '18 моделей · 500 ВА – 30 кВА' },
    ],
    cta: 'Оставить заявку',
    note: '1 минута · Менеджер сам перезвонит',
    monitorTitle: 'Монитор сети',
    monitorIn: 'Вход',
    monitorOut: 'Выход',
    monitorCaption: 'Сеть скачет. Техника — под защитой.',
  },
  offer: {
    kicker: 'Форматы сотрудничества',
    title: 'Выберите удобный формат',
    hot: 'Самый удобный',
    items: {
      after: 'Передаём товар — рассчитываетесь после продажи.',
      nasiya: 'Забираете товар сейчас, платите в согласованный срок.',
      wholesale: 'При крупном объёме — отдельная цена и условия.',
      consult: 'Не знаете, что подходит, — менеджер объяснит.',
    },
    pick: 'Выбрать',
    contract: 'Все условия фиксируются в официальном договоре',
  },
  products: {
    kicker: 'Продукция',
    title: 'Стабилизатор для любого клиента',
    lead: '18 моделей, от 500 ВА до 30 кВА. Нажмите на модель — увидите фото и характеристики.',
    more: 'Подробнее',
    priceNote: 'Партнёрские цены зависят от формата оплаты и объёма — менеджер назовёт их после заявки.',
    cta: 'Узнать цены',
    fitFor: 'Для',
  },
  fit: {
    s: 'Холодильник, ТВ, компьютер',
    m: 'Кондиционер, стиральная машина',
    l: 'Вся квартира или офис',
    xl: 'Частный дом, мастерская, цех',
  },
  series: {
    RRC95: { tag: 'Универсальная', type: 'Релейный', short: 'Самая популярная серия: для квартир, офисов и магазинов.' },
    RRC45: { tag: 'Низкое напряжение', type: 'Релейный', short: 'Для районов с сильными просадками — работает от 45 В.' },
    RTC: { tag: 'Точность ±5%', type: 'Автоматический (AVR)', short: 'Для чувствительной техники и производства.' },
  },
  who: {
    kicker: 'Кому выгодно',
    title: 'Стабилизатор нужен каждому дому и бизнесу',
    lead: 'Скачки напряжения выводят технику из строя — поэтому спрос на стабилизаторы есть круглый год.',
    items: [
      { t: 'Квартиры', d: 'Холодильник, кондиционер, телевизор', p: '0,5–3 кВА' },
      { t: 'Весь дом и офис', d: 'Квартира, офис, магазин', p: '5–10 кВА' },
      { t: 'Мастерские и цеха', d: 'Частный дом, мощное оборудование', p: '15–30 кВА' },
      { t: 'Районы с низким напряжением', d: 'Где сеть падает до 45 В', p: 'RRC45' },
    ],
    sellersTitle: 'Сотрудничество для:',
    sellers: ['Магазинов электротоваров', 'Магазинов бытовой техники', 'Строительных магазинов', 'Мастеров по кондиционерам', 'Онлайн-продавцов'],
  },
  how: {
    kicker: 'Как это работает',
    title: '3 шага — и товар на вашей полке',
    steps: [
      { t: 'Оставляете заявку', d: '1 минута: имя, телефон и магазин.' },
      { t: 'Заключаем договор', d: 'Менеджер позвонит и расскажет цены и условия.' },
      { t: 'Продаёте и зарабатываете', d: 'Оплата — в выбранном вами формате.' },
    ],
  },
  final: {
    title: 'Нужны стабилизаторы в ваш магазин?',
    text: 'Оставьте заявку — менеджер расскажет цены и условия.',
    cta: 'Оставить заявку',
  },
  specs: {
    type: 'Тип',
    power: 'Мощность',
    input: 'Входное напряжение',
    output: 'Выходное напряжение',
    display: 'Дисплей',
    displayV: 'Цифровой LED',
    bypass: 'Режим Bypass',
    bypassV: 'Есть',
    protection: 'Защита',
    protect: {
      RRC95: ['Повышенное напряжение', 'Пониженное напряжение', 'Перегрузка', 'Короткое замыкание'],
      RRC45: ['Высокое и низкое напряжение', 'Перегрузка', 'Короткое замыкание'],
      RTC: ['Повышенное напряжение', 'Пониженное напряжение', 'Перегрузка', 'Короткое замыкание', 'Перегрев'],
    },
  },
  modal: { close: 'Закрыть', ask: 'Оставить заявку', askNote: 'Партнёрскую цену назовёт менеджер' },
  lead: {
    title: 'Оставить заявку',
    sub: 'Менеджер свяжется с вами и расскажет цены и условия.',
    model: 'Модель',
    name: 'Ваше имя',
    namePh: 'Например, Азиз',
    phone: 'Номер телефона',
    shop: 'Название магазина',
    shopPh: 'Например, «Электро Мир»',
    city: 'Город / область',
    cityPh: 'Выберите',
    type: 'Формат сотрудничества',
    types: {
      after: 'Оплата после продажи',
      nasiya: 'Рассрочка',
      wholesale: 'Оптовая закупка',
      consult: 'Отдельная консультация',
    },
    typeHints: {
      after: '0 сум заранее',
      nasiya: 'Оплата частями',
      wholesale: 'Отдельная цена',
      consult: 'Менеджер объяснит',
    },
    submit: 'Отправить заявку',
    sending: 'Отправляем…',
    consent: 'Нажимая кнопку, вы соглашаетесь, что мы свяжемся с вами по телефону.',
    errName: 'Введите имя',
    errPhone: 'Введите номер полностью: +998 XX XXX XX XX',
    errShop: 'Введите название магазина',
    errCity: 'Выберите город или область',
    errType: 'Выберите формат сотрудничества',
    fail: 'Заявка не отправилась. Проверьте интернет и нажмите ещё раз.',
    failCall: 'Или позвоните:',
    okTitle: 'Спасибо! Заявка принята',
    okText: 'Менеджер скоро позвонит на номер {phone}.',
    okClose: 'Хорошо',
  },
  footer: {
    about: 'RUTIM electric — однофазные стабилизаторы напряжения. Сотрудничество с магазинами по договору.',
    inn: 'ИНН',
    rights: 'Все права защищены.',
  },
}

export const DICTS = { uz, ru }
const LangCtx = createContext(null)

const initialLang = () => {
  try {
    const q = new URLSearchParams(location.search).get('lang')
    if (q && DICTS[q]) return q
    const s = localStorage.getItem('lang')
    if (s && DICTS[s]) return s
  } catch {}
  return 'uz'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const dict = DICTS[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = dict.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description)
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang, dict])

  return <LangCtx.Provider value={{ lang, setLang, t: dict }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
