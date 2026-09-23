import { useEffect, useState } from 'react'
import { IconClipboardList, IconSend, IconLock } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'
import { slugify } from '../utils/slugify'
import { trackClick } from '../api'

function defaultValueFor(field) {
  if (field.type === 'checkbox') return false
  if (field.type === 'select') return field.options?.[0] || ''
  return ''
}

function buildFieldValues(fields) {
  const values = {}
  for (const field of fields) {
    values[slugify(field.label)] = defaultValueFor(field)
  }
  return values
}

const fieldInputClass = 'w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2 font-body text-body-md focus:bg-surface-card focus:outline-none'

const QuoteForm = () => {
  const { content } = useSiteData()
  const { sucursales, cotizadores } = content
  const branches = sucursales?.branches || []
  const categories = cotizadores?.categories || []

  const [categoryIndex, setCategoryIndex] = useState(0)
  const category = categories[categoryIndex]
  const [fieldValues, setFieldValues] = useState(() => buildFieldValues(category?.fields || []))
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [sucursal, setSucursal] = useState(branches[0]?.nombre || '')

  useEffect(() => {
    setFieldValues(buildFieldValues(category?.fields || []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryIndex, categories.length])

  useEffect(() => {
    if (!sucursal && branches[0]) setSucursal(branches[0].nombre)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branches.length])

  const updateField = (fieldKey, field) => (e) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value
    setFieldValues((v) => ({ ...v, [fieldKey]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    trackClick('cotizador_submit')

    const branch = branches.find((b) => b.nombre === sucursal) || branches[0]
    const lines = [`Hola! Mi nombre es ${nombre || 'sin especificar'}.`]
    lines.push(`Quisiera cotizar un seguro de: ${category?.label || 'Seguro'}.`)
    for (const field of category?.fields || []) {
      const key = slugify(field.label)
      const raw = fieldValues[key]
      const display = field.type === 'checkbox' ? (raw ? 'Sí' : 'No') : raw || 'no especificado'
      lines.push(`${field.label}: ${display}.`)
    }
    lines.push(`Sede preferida: ${sucursal || 'sin especificar'}.`)
    if (telefono) lines.push(`Mi teléfono de contacto es ${telefono}.`)

    window.open(waLink(branch?.whatsapp, lines.join(' ')), '_blank')
  }

  if (!category) return null

  return (
    <div className="bg-surface-card text-on-surface rounded-xl p-space-lg shadow-xl relative overflow-hidden">
      <div className="w-full h-1.5 bg-gradient-to-r from-secondary via-error to-secondary-container absolute top-0 left-0" />

      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-2">
          <IconClipboardList size={24} className="text-secondary" />
          <h2 className="font-heading text-headline-sm text-navy-deep">Cotizador Express</h2>
        </div>
        <span className="text-on-surface-variant font-heading text-label-sm uppercase bg-surface-subtle px-2.5 py-1 rounded-full">
          100% Gratuito
        </span>
      </div>

      <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-heading text-label-md text-on-surface-variant">Tipo de Seguro</label>
          <select
            className={fieldInputClass}
            value={categoryIndex}
            onChange={(e) => setCategoryIndex(Number(e.target.value))}
          >
            {categories.map((cat, index) => (
              <option key={cat.label} value={index}>{cat.label}</option>
            ))}
          </select>
        </div>

        {category.fields.map((field) => {
          const key = slugify(field.label)
          if (field.type === 'checkbox') {
            return (
              <div key={key} className="p-3 bg-surface-subtle rounded-lg flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`field-${key}`}
                  className="w-4 h-4 rounded text-error accent-error cursor-pointer"
                  checked={!!fieldValues[key]}
                  onChange={updateField(key, field)}
                />
                <label htmlFor={`field-${key}`} className="font-heading text-label-sm text-on-surface cursor-pointer select-none">
                  {field.label}
                </label>
              </div>
            )
          }
          if (field.type === 'select') {
            return (
              <div key={key} className="flex flex-col gap-1">
                <label className="font-heading text-label-md text-on-surface-variant">{field.label}</label>
                <select className={fieldInputClass} value={fieldValues[key] || ''} onChange={updateField(key, field)}>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )
          }
          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="font-heading text-label-md text-on-surface-variant">{field.label}</label>
              <input
                type={field.type === 'number' ? 'number' : 'text'}
                className={fieldInputClass}
                value={fieldValues[key] || ''}
                onChange={updateField(key, field)}
              />
            </div>
          )
        })}

        <div className="flex flex-col gap-1">
          <label className="font-heading text-label-md text-on-surface-variant">Sucursal más cercana</label>
          <select className={fieldInputClass} value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
            {branches.map((b) => (
              <option key={b.nombre} value={b.nombre}>{b.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-heading text-label-md text-on-surface-variant">Nombre y Apellido</label>
          <input
            required
            className={fieldInputClass}
            placeholder="Tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-heading text-label-md text-on-surface-variant">WhatsApp / Teléfono</label>
          <input
            required
            type="tel"
            className={fieldInputClass}
            placeholder="Ej: 11 2595 7130"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 px-4 rounded-lg bg-error hover:bg-accent-red-hover text-on-error font-heading text-label-md uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <IconSend size={20} />
          Cotizar con un Asesor
        </button>

        <div className="flex items-center justify-center gap-2 text-on-surface-variant font-heading text-label-sm mt-1">
          <IconLock size={16} className="text-success-badge" />
          Respuesta en menos de 15 minutos en horario comercial
        </div>
      </form>
    </div>
  )
}

export default QuoteForm
