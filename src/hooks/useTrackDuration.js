import { useEffect } from 'react'
import { trackDuration } from '../api'

// Mide cuánto tiempo pasa el visitante en la página y lo reporta una sola vez,
// apenas oculta o cierra la pestaña (más confiable que "beforeunload").
export function useTrackDuration() {
  useEffect(() => {
    const startedAt = Date.now()
    let sent = false

    const sendDuration = () => {
      if (sent) return
      const seconds = Math.round((Date.now() - startedAt) / 1000)
      if (seconds > 0) {
        trackDuration(seconds)
        sent = true
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendDuration()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', sendDuration)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', sendDuration)
    }
  }, [])
}
