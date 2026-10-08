import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { track } from './pixel'

const LeadCtx = createContext(null)

// Ariza formasini oldindan to‘ldirish: { model? }. requestLead formaga aylantiradi
// va Meta Pixel’ga InitiateCheckout (diler narxiga qiziqish) hodisasini yuboradi.
export function LeadProvider({ children }) {
  const [prefill, setPrefill] = useState(null)

  const requestLead = useCallback((opts = {}) => {
    track('InitiateCheckout', opts.model ? { content_name: opts.model } : undefined)
    setPrefill({ ...opts, at: Date.now() })
    // Modal yopilib, fokus qaytgandan keyin aylantiramiz
    setTimeout(() => scrollToId('lead'), 60)
  }, [])

  const value = useMemo(() => ({ prefill, requestLead }), [prefill, requestLead])
  return <LeadCtx.Provider value={value}>{children}</LeadCtx.Provider>
}

export const useLead = () => useContext(LeadCtx)

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
