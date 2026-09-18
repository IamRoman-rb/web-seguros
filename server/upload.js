import multer from 'multer'
import path from 'node:path'
import { nanoid } from 'nanoid'
import { UPLOADS_DIR } from './db.js'

const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'])

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${nanoid(12)}${ALLOWED_EXT.has(ext) ? ext : '.jpg'}`)
  },
})

function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase()
  if (!ALLOWED_EXT.has(ext) || !file.mimetype.startsWith('image/')) {
    return cb(new Error('Formato de imagen no soportado'))
  }
  cb(null, true)
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
})

export function publicUploadUrl(filename) {
  return `/uploads/${filename}`
}
