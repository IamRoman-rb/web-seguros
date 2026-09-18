import { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { nanoid } from 'nanoid'
import { getDb, updateDb, UPLOADS_DIR } from '../db.js'
import { requireAuth } from '../auth.js'
import { upload, publicUploadUrl } from '../upload.js'

const router = Router()

router.get('/', (_req, res) => {
  const db = getDb()
  const events = [...db.events].sort((a, b) => new Date(b.fecha || b.createdAt) - new Date(a.fecha || a.createdAt))
  res.json(events)
})

router.post('/', requireAuth, upload.single('imagen'), (req, res) => {
  const { titulo, subtitulo, descripcion, ubicacion, fecha } = req.body || {}
  if (!titulo) {
    return res.status(400).json({ error: 'El título es requerido' })
  }

  const event = {
    id: nanoid(10),
    titulo,
    subtitulo: subtitulo || '',
    descripcion: descripcion || '',
    ubicacion: ubicacion || '',
    fecha: fecha || new Date().toISOString(),
    imagen: req.file ? publicUploadUrl(req.file.filename) : null,
    createdAt: new Date().toISOString(),
  }

  updateDb((db) => {
    db.events.push(event)
  })

  res.status(201).json(event)
})

router.put('/:id', requireAuth, upload.single('imagen'), (req, res) => {
  const { id } = req.params
  const db = getDb()
  const existing = db.events.find((e) => e.id === id)
  if (!existing) return res.status(404).json({ error: 'Evento no encontrado' })

  const { titulo, subtitulo, descripcion, ubicacion, fecha } = req.body || {}
  const previousImage = existing.imagen

  const updated = {
    ...existing,
    titulo: titulo ?? existing.titulo,
    subtitulo: subtitulo ?? existing.subtitulo,
    descripcion: descripcion ?? existing.descripcion,
    ubicacion: ubicacion ?? existing.ubicacion,
    fecha: fecha ?? existing.fecha,
    imagen: req.file ? publicUploadUrl(req.file.filename) : existing.imagen,
  }

  updateDb((data) => {
    const idx = data.events.findIndex((e) => e.id === id)
    data.events[idx] = updated
  })

  if (req.file && previousImage && previousImage.startsWith('/uploads/')) {
    const oldPath = path.join(UPLOADS_DIR, path.basename(previousImage))
    fs.unlink(oldPath, () => {})
  }

  res.json(updated)
})

router.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params
  const db = getDb()
  const existing = db.events.find((e) => e.id === id)
  if (!existing) return res.status(404).json({ error: 'Evento no encontrado' })

  updateDb((data) => {
    data.events = data.events.filter((e) => e.id !== id)
  })

  if (existing.imagen && existing.imagen.startsWith('/uploads/')) {
    const filePath = path.join(UPLOADS_DIR, path.basename(existing.imagen))
    fs.unlink(filePath, () => {})
  }

  res.json({ ok: true })
})

export default router
