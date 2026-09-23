import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  IconCalculator, IconBrandWhatsapp, IconCar, IconArrowRight,
  IconClipboardList, IconSend, IconLock,
} from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'
import { trackClick } from '../api'

const Banner = () => {
  const { content } = useSiteData()
  const { hero, sucursales, coberturas } = content
  const branches = sucursales?.branches || []
  const insuranceOptions = coberturas?.items?.map((i) => i.title) || ['Automotor']

  const [form, setForm] = useState({
    tipo: insuranceOptions[0] || '',
    anio: '',
    sucursal: branches[0]?.nombre || '',
    nombre: '',
    telefono: '',
    vintage: false,
  })

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    trackClick('cotizador_submit')
    const branch = branches.find((b) => b.nombre === form.sucursal) || branches[0]
    const message = `Hola! Mi nombre es ${form.nombre || 'sin especificar'}. Quisiera cotizar un seguro de: ${form.tipo}. Modelo/Año: ${form.anio || 'no especificado'}. Antigüedad +20 años: ${form.vintage ? 'SÍ' : 'NO'}. Sede preferida: ${form.sucursal}.`
    window.open(waLink(branch?.whatsapp, message), '_blank')
  }

  return (
    <section id="inicio" className="relative w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-space-2xl overflow-hidden">
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 top-10 w-72 h-72 rounded-full bg-error/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="flex flex-wrap items-center gap-space-xs mb-space-md">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white font-heading text-label-md">
                {hero?.badge1}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/20 text-secondary-fixed font-heading text-label-sm uppercase tracking-wider">
                {hero?.badge2}
              </span>
            </div>

            <h1 className="font-heading text-headline-xl-mobile md:text-headline-xl text-on-primary tracking-tight mb-space-md max-w-2xl leading-tight">
              {hero?.titleBeforeHighlight}{' '}
              <span className="text-error underline decoration-secondary decoration-4 underline-offset-8">
                {hero?.titleHighlight}
              </span>{' '}
              {hero?.titleAfterHighlight}
            </h1>

            <p className="font-body text-body-lg text-primary-fixed mb-space-xl max-w-xl">
              {hero?.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-space-md mb-space-lg">
              <a
                href="#cotizador-rapido"
                onClick={() => trackClick('hero_cotizar')}
                className="inline-flex items-center gap-2 px-space-lg py-3 rounded bg-error hover:bg-accent-red-hover text-on-error font-heading text-label-md uppercase tracking-wider transition-all shadow-md"
              >
                <IconCalculator size={20} />
                {hero?.ctaText}
              </a>
              {branches[0] && (
                <a
                  href={waLink(branches[0].whatsapp, 'Hola, quisiera hacer una consulta.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick('hero_whatsapp')}
                  className="inline-flex items-center gap-2 px-space-lg py-3 rounded bg-white/10 hover:bg-white/20 text-on-primary font-heading text-label-md transition-colors"
                >
                  <IconBrandWhatsapp size={20} className="text-success-badge" />
                  WhatsApp Directo
                </a>
              )}
            </div>

            <a href="#vehiculos-antiguos" className="flex items-center gap-3 p-3 rounded-xl bg-primary/60 hover:bg-primary transition-all max-w-lg">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-error/20 text-error flex items-center justify-center">
                <IconCar size={22} />
              </span>
              <div className="flex flex-col text-left">
                <span className="font-heading text-label-md text-on-primary flex items-center gap-1">
                  {hero?.miniHighlightTitle}
                  <IconArrowRight size={14} className="text-error" />
                </span>
                <span className="font-body text-body-sm text-primary-fixed-dim">
                  {hero?.miniHighlightText}
                </span>
              </div>
            </a>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-5 w-full"
            id="cotizador-rapido"
          >
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
                    className="w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2.5 font-body text-body-md focus:bg-surface-card focus:outline-none"
                    value={form.tipo}
                    onChange={update('tipo')}
                  >
                    {insuranceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-heading text-label-md text-on-surface-variant">Año / Modelo</label>
                    <input
                      className="w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2 font-body text-body-md focus:bg-surface-card focus:outline-none"
                      placeholder="Ej. 1999 o 2018"
                      value={form.anio}
                      onChange={update('anio')}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-heading text-label-md text-on-surface-variant">Sucursal más cercana</label>
                    <select
                      className="w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2 font-body text-body-md focus:bg-surface-card focus:outline-none"
                      value={form.sucursal}
                      onChange={update('sucursal')}
                    >
                      {branches.map((b) => (
                        <option key={b.nombre} value={b.nombre}>{b.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-surface-subtle rounded-lg flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="vintageCheck"
                    className="w-4 h-4 rounded text-error accent-error cursor-pointer"
                    checked={form.vintage}
                    onChange={update('vintage')}
                  />
                  <label htmlFor="vintageCheck" className="font-heading text-label-sm text-on-surface cursor-pointer select-none">
                    Mi vehículo tiene más de 20 años de antigüedad
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading text-label-md text-on-surface-variant">Nombre y Apellido</label>
                  <input
                    required
                    className="w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2 font-body text-body-md focus:bg-surface-card focus:outline-none"
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={update('nombre')}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-heading text-label-md text-on-surface-variant">WhatsApp / Teléfono</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-surface-subtle text-on-surface rounded-lg px-3 py-2 font-body text-body-md focus:bg-surface-card focus:outline-none"
                    placeholder="Ej: 11 2595 7130"
                    value={form.telefono}
                    onChange={update('telefono')}
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
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Banner
