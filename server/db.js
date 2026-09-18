import fs from 'node:fs'
import path from 'node:path'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'node:url'
import { defaultContent } from './defaultContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const DATA_DIR = path.join(__dirname, 'data')
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads')
const DB_FILE = path.join(DATA_DIR, 'db.json')

function ensureDirs() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

function buildInitialDb() {
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'cambiar123'
  const passwordHash = bcrypt.hashSync(adminPassword, 10)

  if (!process.env.ADMIN_PASSWORD) {
    console.warn('\n[AVISO] No se definió ADMIN_PASSWORD como variable de entorno.')
    console.warn(`[AVISO] Se creó el usuario admin "${adminUser}" con la contraseña temporal "${adminPassword}".`)
    console.warn('[AVISO] Cambiá esta contraseña o definí ADMIN_USER / ADMIN_PASSWORD antes de publicar en producción.\n')
  }

  return {
    users: [{ username: adminUser, passwordHash }],
    content: defaultContent,
    events: seedEvents(),
  }
}

function seedEvents() {
  const now = new Date()
  return [
    {
      id: 'seed-golf-torneo',
      titulo: 'Torneo de Golf',
      subtitulo: '¡Gran jornada de golf en Santa Teresita! ⛳',
      descripcion: 'Vivimos un fin de semana a puro deporte y camaradería en la Copa Organización San Francisco. Agradecemos a todos los golfistas que participaron de este gran torneo local y nos acompañaron en una jornada excepcional.',
      ubicacion: 'Santa Teresita, Buenos Aires',
      fecha: new Date(now.getFullYear() - 1, 10, 15).toISOString(),
      imagen: '/assets/golf-torneo.jpeg',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-tc-fontana',
      titulo: 'Final TC 2025',
      subtitulo: '¡Aceleramos junto a Norberto Fontana en la gran final del TC! 🏁',
      descripcion: 'El Autódromo Roberto Mouras de La Plata vibró con la definición del Turismo Carretera, y Organización San Francisco estuvo ahí, acompañando como sponsors a un histórico como Norberto Fontana en esta fecha tan especial.',
      ubicacion: 'Autódromo Roberto Mouras, La Plata',
      fecha: new Date(now.getFullYear() - 1, 11, 7).toISOString(),
      imagen: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'seed-golf-aniversario',
      titulo: 'Torneo Aniversario: Golf Club Santa Teresita',
      subtitulo: '18 Hoyos Medal Play',
      descripcion: 'Organización San Francisco dice presente una vez más para acompañar a los golfistas en este gran desafío. Disfrutá de un entorno increíble y del mejor deporte, sabiendo que tenés el equipo de seguros más confiable de tu lado.',
      ubicacion: 'Golf Club Santa Teresita',
      fecha: new Date(now.getFullYear(), 2, 28).toISOString(),
      imagen: '/assets/golf-aniversario.jpeg',
      createdAt: new Date().toISOString(),
    },
  ]
}

let cache = null

function load() {
  if (cache) return cache
  ensureDirs()
  if (!fs.existsSync(DB_FILE)) {
    cache = buildInitialDb()
    save(cache)
    return cache
  }
  try {
    cache = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
  } catch (err) {
    console.error('No se pudo leer la base de datos, se reinicia con valores por defecto.', err)
    cache = buildInitialDb()
    save(cache)
  }
  return cache
}

function save(data) {
  ensureDirs()
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8')
  cache = data
}

export function getDb() {
  return load()
}

export function updateDb(mutator) {
  const data = load()
  mutator(data)
  save(data)
  return data
}
