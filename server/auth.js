import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-cambiar-en-produccion'
const COOKIE_NAME = 'osf_session'
const TOKEN_TTL = '12h'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_TTL })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 12 * 60 * 60 * 1000,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME)
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  const payload = token ? verifyToken(token) : null
  if (!payload) {
    return res.status(401).json({ error: 'No autenticado' })
  }
  req.user = payload
  next()
}

export function getSessionUser(req) {
  const token = req.cookies?.[COOKIE_NAME]
  const payload = token ? verifyToken(token) : null
  return payload
}

export { COOKIE_NAME }
