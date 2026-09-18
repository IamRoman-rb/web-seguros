import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { defaultContent } from '../../server/defaultContent.js'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [events, setEvents] = useState([])
  const [eventsLoaded, setEventsLoaded] = useState(false)

  const refreshContent = useCallback(async () => {
    try {
      const data = await api.getContent()
      setContent((prev) => ({ ...prev, ...data }))
    } catch {
      // Se mantienen los valores por defecto si la API no responde.
    }
  }, [])

  const refreshEvents = useCallback(async () => {
    try {
      const data = await api.getEvents()
      setEvents(data)
    } catch {
      setEvents([])
    } finally {
      setEventsLoaded(true)
    }
  }, [])

  useEffect(() => {
    refreshContent()
    refreshEvents()
  }, [refreshContent, refreshEvents])

  const value = useMemo(
    () => ({ content, events, eventsLoaded, refreshContent, refreshEvents }),
    [content, events, eventsLoaded, refreshContent, refreshEvents]
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData debe usarse dentro de SiteDataProvider')
  return ctx
}
