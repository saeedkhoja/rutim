import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const LeadCtx = createContext(null)

// Ariza oynasi holati: null — yopiq, { type?, model? } — ochiq (oldindan tanlangan qiymatlar bilan)
export function LeadProvider({ children }) {
  const [lead, setLead] = useState(null)

  const openLead = useCallback((opts = {}) => setLead({ ...opts, at: Date.now() }), [])
  const closeLead = useCallback(() => setLead(null), [])

  const value = useMemo(() => ({ lead, openLead, closeLead }), [lead, openLead, closeLead])
  return <LeadCtx.Provider value={value}>{children}</LeadCtx.Provider>
}

export const useLead = () => useContext(LeadCtx)

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
