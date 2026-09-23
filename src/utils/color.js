function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex({ r, g, b }) {
  const toHex = (v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbToHsl({ r, g, b }) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      default: h = (r - g) / d + 4
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToRgb({ h, s, l }) {
  h /= 360
  s /= 100
  l /= 100
  if (s === 0) {
    const v = l * 255
    return { r: v, g: v, b: v }
  }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  }
}

function clampPercent(v) {
  return Math.min(100, Math.max(0, v))
}

export function lighten(hex, amount) {
  const hsl = rgbToHsl(hexToRgb(hex))
  hsl.l = clampPercent(hsl.l + amount)
  return rgbToHex(hslToRgb(hsl))
}

export function darken(hex, amount) {
  return lighten(hex, -amount)
}

// Deriva la paleta completa de la web a partir de dos colores elegidos
// por el usuario (azul principal y rojo de acento).
export function deriveThemeColors({ primaryColor, accentColor }) {
  return {
    '--color-primary': primaryColor,
    '--color-primary-container': primaryColor,
    '--color-navy-deep': darken(primaryColor, 10),
    '--color-secondary': lighten(primaryColor, 20),
    '--color-error': accentColor,
    '--color-accent-red-hover': lighten(accentColor, 10),
  }
}

export function applyThemeColors(theme) {
  if (!theme?.primaryColor || !theme?.accentColor) return
  const vars = deriveThemeColors(theme)
  const root = document.documentElement.style
  for (const [key, value] of Object.entries(vars)) {
    root.setProperty(key, value)
  }
}
