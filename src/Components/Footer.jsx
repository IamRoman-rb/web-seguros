import { IconShield, IconCamera, IconMapPin, IconPhone, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'
import { slugify } from '../utils/slugify'
import { trackClick } from '../api'

const Footer = () => {
  const { content } = useSiteData()
  const { meta, footer, sucursales } = content
  const branches = sucursales?.branches || []
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-primary-container text-white pt-space-2xl pb-space-xl">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-space-xl pb-space-2xl border-b border-white/20">
          <div className="max-w-md">
            <div className="flex items-center gap-space-sm mb-space-sm">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                <IconShield size={22} className="text-primary-container" />
              </div>
              <span className="font-heading text-headline-sm text-white tracking-tight">{meta?.siteName}</span>
            </div>
            <p className="font-body text-body-md text-primary-fixed mb-space-md leading-relaxed">
              "{footer?.slogan}" Asesoramiento independiente y cobertura integral adaptada a familias, profesionales y empresas.
            </p>
            {sucursales?.instagramUrl && (
              <a
                href={sucursales.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('instagram_click')}
                className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-heading text-label-sm transition-all"
              >
                <IconCamera size={16} />
                Instagram {sucursales.instagramHandle}
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md w-full lg:w-auto flex-1 lg:max-w-2xl">
            {branches.map((branch) => (
              <div key={branch.nombre} className="bg-white text-on-surface p-space-md md:p-space-lg rounded-xl shadow-[0_4px_16px_-2px_rgba(11,37,69,0.1)]">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-heading text-title-lg text-navy-deep">{branch.nombre}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-subtle text-on-surface-variant font-heading text-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-badge" />
                    Abierto
                  </span>
                </div>
                <p className="font-body text-body-sm text-on-surface-variant flex items-start gap-space-xs mb-space-xs">
                  <IconMapPin size={18} className="text-secondary flex-shrink-0" />
                  <span>{branch.direccion}</span>
                </p>
                <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-space-xs mb-space-xs">
                  <IconPhone size={18} className="text-secondary flex-shrink-0" />
                  <a className="font-semibold text-primary hover:text-secondary transition-colors" href={waLink(branch.whatsapp)} target="_blank" rel="noopener noreferrer">
                    WhatsApp: {branch.whatsapp}
                  </a>
                </p>
                <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-space-xs mb-space-md">
                  <IconMail size={18} className="text-secondary flex-shrink-0" />
                  <a className="hover:underline break-all" href={`mailto:${branch.email}`}>{branch.email}</a>
                </p>
                <a
                  href={waLink(branch.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(`footer_whatsapp_${slugify(branch.nombre)}`)}
                  className="inline-flex w-full items-center justify-center gap-space-xs py-2 px-space-md rounded-lg bg-surface-subtle hover:bg-surface-container text-primary font-heading text-label-md transition-colors"
                >
                  <IconBrandWhatsapp size={16} className="text-success-badge" />
                  Contactar Sucursal
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md font-body text-body-sm text-white/80">
          <div className="text-center md:text-left space-y-1">
            <p>© {year} {meta?.siteName}. Todos los derechos reservados.</p>
            <p className="text-white/60 font-heading text-label-sm">{footer?.legalLine}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
