import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { UPLOADS_DIR } from './db.js'
import authRoutes from './routes/auth.js'
import eventsRoutes from './routes/events.js'
import contentRoutes from './routes/content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 4001

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())

app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d' }))

app.use('/api/auth', authRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/content', contentRoutes)

app.use((err, _req, res, next) => {
  if (res.headersSent) return next(err)
  if (err?.message?.includes('imagen') || err?.name === 'MulterError') {
    return res.status(400).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// En producción, un único proceso Node sirve tanto la API como el build de React.
const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`)
  if (!fs.existsSync(distPath)) {
    console.log('No se encontró la carpeta "dist". Corré "npm run build" antes de publicar en producción.')
  }
})
