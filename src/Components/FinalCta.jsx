import { IconClipboardList, IconBrandWhatsapp } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'

const FinalCta = () => {
  const { content } = useSiteData()
  const { finalCta, sucursales } = content
  const branches = sucursales?.branches || []

  return (
    <section className="w-full py-space-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-error/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-container mx-auto px-margin-mobile md:px-margin text-center">
        <span className="font-heading text-label-sm uppercase tracking-widest text-error font-bold mb-space-xs block">
          {finalCta?.eyebrow}
        </span>
        <h2 className="font-heading text-headline-xl-mobile md:text-headline-xl text-on-primary mb-space-md max-w-3xl mx-auto">
          {finalCta?.title}
        </h2>
        <p className="font-body text-body-lg text-primary-fixed mb-space-xl max-w-2xl mx-auto">
          {finalCta?.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-space-md">
          <a
            href="#cotizador-rapido"
            className="inline-flex items-center gap-2 px-space-xl py-3.5 rounded bg-error hover:bg-accent-red-hover text-on-error font-heading text-label-md uppercase tracking-wider transition-all shadow-xl"
          >
            <IconClipboardList size={20} />
            Cotizar Ahora
          </a>
          {branches.map((branch) => (
            <a
              key={branch.nombre}
              href={waLink(branch.whatsapp, `Hola, quisiera hablar con un asesor de ${branch.nombre}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-space-xl py-3.5 rounded bg-surface-card hover:bg-surface-container text-navy-deep font-heading text-label-md uppercase tracking-wider transition-all shadow-md"
            >
              <IconBrandWhatsapp size={20} className="text-success-badge" />
              WhatsApp {branch.nombre}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FinalCta
