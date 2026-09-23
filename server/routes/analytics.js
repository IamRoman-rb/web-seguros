import { Router } from 'express'
import { getDb, updateDb, pruneOldDays, bumpBoundedCounter } from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

const SAFE_KEY = /^[a-zA-Z0-9/_-]{1,64}$/

function today() {
  return new Date().toISOString().slice(0, 10)
}

const MAX_DURATION_SECONDS = 6 * 60 * 60 // descarta valores absurdos (pestaña abierta días, relojes manipulados)

// Público: cualquier visitante del sitio puede reportar una vista, un click o el tiempo que estuvo en el sitio.
router.post('/event', (req, res) => {
  const { type, path, label, seconds } = req.body || {}
  const day = today()

  if (type === 'pageview' && typeof path === 'string' && SAFE_KEY.test(path)) {
    updateDb((db) => {
      const a = db.analytics
      a.pageviewsByDay[day] = (a.pageviewsByDay[day] || 0) + 1
      bumpBoundedCounter(a.pageviewsByPath, path)
      a.totalPageviews = (a.totalPageviews || 0) + 1
      pruneOldDays(a.pageviewsByDay)
    })
    return res.status(204).end()
  }

  if (type === 'click' && typeof label === 'string' && SAFE_KEY.test(label)) {
    updateDb((db) => {
      const a = db.analytics
      a.clicksByDay[day] = (a.clicksByDay[day] || 0) + 1
      bumpBoundedCounter(a.clicksByLabel, label)
      a.totalClicks = (a.totalClicks || 0) + 1
      pruneOldDays(a.clicksByDay)
    })
    return res.status(204).end()
  }

  if (type === 'duration' && typeof seconds === 'number' && seconds > 0 && seconds < MAX_DURATION_SECONDS) {
    const rounded = Math.round(seconds)
    updateDb((db) => {
      const a = db.analytics
      a.totalDurationSeconds = (a.totalDurationSeconds || 0) + rounded
      a.totalDurationSamples = (a.totalDurationSamples || 0) + 1
      const bucket = a.durationByDay[day] || { totalSeconds: 0, samples: 0 }
      bucket.totalSeconds += rounded
      bucket.samples += 1
      a.durationByDay[day] = bucket
      pruneOldDays(a.durationByDay)
    })
    return res.status(204).end()
  }

  res.status(400).json({ error: 'Datos de evento inválidos' })
})

// Privado: solo el panel de administración puede leer el resumen.
router.get('/summary', requireAuth, (_req, res) => {
  res.json(getDb().analytics)
})

export default router
