import { useEffect, useRef, useState } from 'react'
import { T } from '../copy'

const N = 64
const W = 320
const H = 110
const vMin = 90
const vMax = 290
const y = (v) => H - ((v - vMin) / (vMax - vMin)) * H

function nextInput(prev, state) {
  if (state.hold > 0) {
    state.hold--
    return state.target + (Math.random() - 0.5) * 6
  }
  const r = Math.random()
  if (r < 0.035) {
    state.target = 120 + Math.random() * 45
    state.hold = 6 + Math.floor(Math.random() * 8)
    return state.target
  }
  if (r < 0.06) {
    state.target = 248 + Math.random() * 22
    state.hold = 4 + Math.floor(Math.random() * 6)
    return state.target
  }
  const pull = (208 - prev) * 0.12
  return Math.max(150, Math.min(262, prev + pull + (Math.random() - 0.5) * 18))
}

const seed = () => {
  const st = { hold: 0, target: 0 }
  const a = [205]
  for (let i = 1; i < N; i++) a.push(nextInput(a[i - 1], st))
  return a
}

const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${((i / (N - 1)) * W).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')

export default function VoltageMonitor() {
  const [input, setInput] = useState(seed)
  const [out, setOut] = useState(() => Array.from({ length: N }, () => 220))
  const st = useRef({ hold: 0, target: 0 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setInput((a) => [...a.slice(1), nextInput(a[a.length - 1], st.current)])
      setOut((a) => [...a.slice(1), 220 + (Math.random() - 0.5) * 1.6])
    }, 140)
    return () => clearInterval(id)
  }, [])

  const vin = Math.round(input[N - 1])
  const bad = vin < 195 || vin > 245

  return (
    <div className="monitor" aria-hidden="true">
      <div className="monitor__head">
        <span className="monitor__dot" /> {T.hero.monitorTitle}
        <span className="monitor__live">LIVE</span>
      </div>
      <div className="monitor__values">
        <div>
          <small>{T.hero.monitorIn}</small>
          <b className={bad ? 'is-bad' : ''}>{vin}<i>V</i></b>
        </div>
        <div className="monitor__arrow">→</div>
        <div>
          <small>{T.hero.monitorOut}</small>
          <b className="is-good">220<i>V</i></b>
        </div>
      </div>
      <svg className="monitor__chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <line x1="0" x2={W} y1={y(220)} y2={y(220)} className="monitor__ref" />
        <path d={path(input)} className="monitor__in" />
        <path d={path(out)} className="monitor__out" />
      </svg>
      <div className="monitor__caption">{T.hero.monitorCaption}</div>
    </div>
  )
}
