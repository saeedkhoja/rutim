const P = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M4 12.5l5 5L20 6.5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  x: 'M6 6l12 12M18 6L6 18',
  bolt: 'M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  store: 'M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M9 20v-5h6v5',
  appliance: 'M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM5 10h14M8 6.5v1M8 13v3',
  brick: 'M3 5h18v14H3zM3 9.7h18M3 14.3h18M9 5v4.7M15 5v4.7M6 9.7v4.6M12 9.7v4.6M18 9.7v4.6M9 14.3V19M15 14.3V19',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.2L3.5 17.3a1.4 1.4 0 002 2l5.8-5.8a4 4 0 005.2-5.4l-2.5 2.5-2.1-.3-.3-2.1 2.5-2.5z',
  bag: 'M5 8h14l-1 13H6L5 8zM9 8V6a3 3 0 016 0v2',
  factory: 'M3 21V10l6 4v-4l6 4V5h6v16H3zM7 17h2M12 17h2M17 17h1',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  camera: 'M4 7h3l2-3h6l2 3h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1zM12 17a4 4 0 100-8 4 4 0 000 8z',
  headset: 'M4 14v-2a8 8 0 0116 0v2M4 14h3v5H5a1 1 0 01-1-1v-4zM20 14h-3v5h2a1 1 0 001-1v-4zM17 19c0 1.5-2 2-5 2',
  doc: 'M6 2h9l5 5v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zM14 2v6h6M8.5 13h7M8.5 17h5',
  calendar: 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4M8 14h2M14 14h2M8 17.5h2',
  wallet: 'M3 7a2 2 0 012-2h13v4M3 7v11a2 2 0 002 2h15V9H5a2 2 0 01-2-2zM16.5 14.5h.01',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  season: 'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 16a4 4 0 100-8 4 4 0 000 8z',
  home: 'M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6',
  chevron: 'M6 9l6 6 6-6',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A17 17 0 013 5a2 2 0 012-2z',
  box: 'M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9zM3 7.5l9 4.5 9-4.5M12 12v9',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  chat: 'M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5',
  telegram: 'M21 4L2.5 11.2l6.3 2.3M21 4l-3.2 16-9-6.5M21 4L8.8 13.5V19l3-3.3',
  tag: 'M3 12.2V4a1 1 0 011-1h8.2L21 11.8 11.8 21 3 12.2zM7.5 7.5h.01',
  truck: 'M2 6h12v10H2zM14 9.5h4l3 3.5v3h-7M6.5 19.5a2 2 0 100-4 2 2 0 000 4zM17.5 19.5a2 2 0 100-4 2 2 0 000 4z',
  swap: 'M4 8h15l-4-4M20 16H5l4 4',
  gift: 'M4 11h16v10H4zM3 7h18v4H3zM12 7v14M12 7C10.5 3 6.5 3.5 7.5 6.2 8 7 12 7 12 7zM12 7c1.5-4 5.5-3.5 4.5-.8C16 7 12 7 12 7z',
  ship: 'M3 15l2 5h14l2-5H3zM6 15V8h12v7M12 8V3M9 5h6',
  stand: 'M4 3h16v11H4zM8 7h8M8 10h5M12 14v7M8 21h8',
  flame: 'M12 3c.5 3.5 5 5.5 5 10.5a5 5 0 01-10 0c0-2.5 1.5-3.8 2.2-5.5.8 1.2 1.5 2.2 1.8 3.5.5-3 1-5.5 1-8.5z',
  snow: 'M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5',
  calc: 'M6 2h12a1 1 0 011 1v18a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zM8 5.5h8v3.5H8zM8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01',
  quote: 'M10 7H6a2 2 0 00-2 2v3h5v5H4M20 7h-4a2 2 0 00-2 2v3h5v5h-5',
  pin: 'M12 21s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
}

export default function Icon({ name, size = 20, className, strokeWidth = 1.8 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  )
}
