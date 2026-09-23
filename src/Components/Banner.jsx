import { motion as Motion } from 'framer-motion'
import { IconCalculator, IconBrandWhatsapp, IconCar, IconArrowRight } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'
import { trackClick } from '../api'
import QuoteForm from './QuoteForm'

const Banner = () => {
  const { content } = useSiteData()
  const { hero, sucursales } = content
  const branches = sucursales?.branches || []

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
            <QuoteForm />
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Banner
