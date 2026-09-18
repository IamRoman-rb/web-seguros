import { Router } from 'express'
import { getDb, updateDb } from '../db.js'
import { requireAuth } from '../auth.js'
import { upload, publicUploadUrl } from '../upload.js'

const router = Router()

router.get('/', (_req, res) => {
  const db = getDb()
  res.json(db.content)
})

router.put('/:section', requireAuth, (req, res) => {
  const { section } = req.params
  const db = getDb()
  if (!(section in db.content)) {
    return res.status(404).json({ error: `Sección de contenido desconocida: ${section}` })
  }

  updateDb((data) => {
    data.content[section] = req.body
  })

  res.json(getDb().content[section])
})

router.post('/image', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se recibió ninguna imagen' })
  res.json({ url: publicUploadUrl(req.file.filename) })
})

export default router
