import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { getDb, updateDb } from '../db.js'
import { signToken, setSessionCookie, clearSessionCookie, getSessionUser, requireAuth } from '../auth.js'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' })
  }

  const db = getDb()
  const user = db.users.find((u) => u.username === username)
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
  }

  const token = signToken({ username: user.username })
  setSessionCookie(res, token)
  res.json({ ok: true, username: user.username })
})

router.post('/logout', (_req, res) => {
  clearSessionCookie(res)
  res.json({ ok: true })
})

router.get('/me', (req, res) => {
  const session = getSessionUser(req)
  if (!session) return res.json({ authenticated: false })
  res.json({ authenticated: true, username: session.username })
})

router.put('/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' })
  }

  const db = getDb()
  const user = db.users.find((u) => u.username === req.user.username)
  if (!user || !bcrypt.compareSync(currentPassword, user.passwordHash)) {
    return res.status(401).json({ error: 'La contraseña actual es incorrecta' })
  }

  const newHash = bcrypt.hashSync(newPassword, 10)
  updateDb((data) => {
    const target = data.users.find((u) => u.username === req.user.username)
    target.passwordHash = newHash
  })

  res.json({ ok: true })
})

export default router
