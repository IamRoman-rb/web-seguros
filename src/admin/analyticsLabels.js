const KNOWN_LABELS = {
  header_cotizar: 'Botón "Cotizar Seguro" (menú)',
  header_whatsapp: 'WhatsApp (menú)',
  hero_cotizar: 'Botón "Cotizar en el acto" (portada)',
  hero_whatsapp: 'WhatsApp Directo (portada)',
  cotizador_submit: 'Envío del Cotizador Express',
  vehiculos_whatsapp: 'WhatsApp (vehículos +20 años)',
  coberturas_consultar: 'Link "Consultar" (coberturas)',
  instagram_click: 'Click en Instagram',
  finalcta_cotizar: 'Botón "Cotizar Ahora" (banner final)',
  floating_whatsapp: 'Botón flotante de WhatsApp',
  __other__: 'Otros',
}

const PREFIX_LABELS = [
  [/^sucursal_whatsapp_(.+)/, (m) => `WhatsApp sucursal: ${titleCase(m[1])}`],
  [/^sucursal_contactar_(.+)/, (m) => `Botón "Contactar": ${titleCase(m[1])}`],
  [/^footer_whatsapp_(.+)/, (m) => `WhatsApp (pie de página): ${titleCase(m[1])}`],
  [/^finalcta_whatsapp_(.+)/, (m) => `WhatsApp (banner final): ${titleCase(m[1])}`],
]

function titleCase(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function formatEventLabel(rawLabel) {
  if (KNOWN_LABELS[rawLabel]) return KNOWN_LABELS[rawLabel]
  for (const [pattern, format] of PREFIX_LABELS) {
    const match = rawLabel.match(pattern)
    if (match) return format(match)
  }
  return titleCase(rawLabel.replace(/_/g, ' '))
}

export function formatPageLabel(path) {
  if (path === '/') return 'Inicio (landing)'
  if (path.startsWith('/admin')) return `Panel de administración (${path})`
  return path
}

export function formatDuration(totalSeconds) {
  const seconds = Math.round(totalSeconds || 0)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}m ${rest}s`
}
