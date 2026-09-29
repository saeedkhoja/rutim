import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const StoreCtx = createContext(null)
const KEY = 'rutim-cart'

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}

export function StoreProvider({ children }) {
  const [items, setItems] = useState(load)
  const [drawer, setDrawer] = useState(false)
  const [payModel, setPayModel] = useState('after')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
  }, [items])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const setQty = useCallback((model, qty) => {
    setItems((s) => {
      const n = { ...s }
      if (qty > 0) n[model] = Math.min(qty, 999)
      else delete n[model]
      return n
    })
  }, [])

  const add = useCallback((model, qty = 1) => {
    setItems((s) => ({ ...s, [model]: Math.min((s[model] || 0) + qty, 999) }))
    setToast(model)
  }, [])

  const addMany = useCallback((map) => {
    setItems((s) => {
      const n = { ...s }
      for (const [m, q] of Object.entries(map)) n[m] = Math.min((n[m] || 0) + q, 999)
      return n
    })
    setToast('kit')
  }, [])

  const clear = useCallback(() => setItems({}), [])

  const value = useMemo(() => {
    const count = Object.values(items).reduce((a, b) => a + b, 0)
    return { items, count, setQty, add, addMany, clear, drawer, setDrawer, payModel, setPayModel, toast }
  }, [items, setQty, add, addMany, clear, drawer, payModel, toast])

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

export const useStore = () => useContext(StoreCtx)

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}
