import { useEffect, useState } from 'react'
import { IconMenu3, IconX, IconBrandWhatsapp, IconArrowRight, IconRosetteDiscountCheck, IconUser } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'

const NAV_ITEMS = [
  { name: 'Inicio', path: '#inicio' },
  { name: 'Coberturas', path: '#coberturas' },
  { name: 'Vehículos +20 Años', path: '#vehiculos-antiguos' },
  { name: 'Aseguradoras', path: '#aseguradoras' },
  { name: 'Sucursales', path: '#sucursales' },
  { name: 'Contacto', path: '#contacto' },
]

const Header = () => {
  const { content } = useSiteData()
  const { meta, header, sucursales } = content
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 4)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const primaryBranch = sucursales?.branches?.[0]
  const whatsappHref = waLink(primaryBranch?.whatsapp, 'Hola, quisiera hacer una consulta.')

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow ${isSticky ? 'shadow-[0_1px_8px_rgba(3,32,76,0.08)]' : ''}`}>
      <div className="bg-primary text-on-primary py-1.5 px-margin-mobile md:px-margin">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-between gap-space-xs font-heading text-label-sm">
          <div className="flex items-center gap-space-xs">
            <IconRosetteDiscountCheck size={15} className="text-success-badge" />
            <span className="tracking-wide">{header?.topbarText}</span>
          </div>
          <div className="hidden sm:flex items-center gap-space-md">
            <span>{header?.topbarHoursText}</span>
          </div>
        </div>
      </div>

      <div className="h-20 max-w-container mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
        <a href="#inicio" className="flex items-center gap-space-sm group flex-shrink-0">
          <img src={meta?.logoUrl} alt={`${meta?.siteName} - Logo`} className="h-10 w-auto object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading text-headline-sm text-primary group-hover:text-secondary transition-colors">
              {meta?.siteName}
            </span>
            <span className="font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">
              Broker de Seguros
            </span>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-1 font-heading text-label-md">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="px-space-sm py-2 rounded text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm sm:gap-space-md flex-shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-2 rounded bg-surface-subtle hover:bg-surface-container text-on-surface font-heading text-label-md transition-all"
          >
            <IconBrandWhatsapp size={18} className="text-success-badge" />
            <span>WhatsApp</span>
          </a>
          <a
            href="#cotizador-rapido"
            className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded bg-error hover:bg-accent-red-hover text-on-error font-heading text-label-md uppercase tracking-wider transition-all shadow-md"
          >
            <span>Cotizar Seguro</span>
            <IconArrowRight size={16} />
          </a>
          <button
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded bg-surface-subtle text-primary"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <IconX size={22} /> : <IconMenu3 size={22} />}
          </button>
          <div className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center flex-shrink-0">
            <IconUser size={18} className="text-on-primary" />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="xl:hidden bg-white border-t border-border-subtle shadow-lg">
          <ul className="flex flex-col p-space-sm font-heading text-label-md">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-space-md py-3 rounded text-on-surface hover:bg-surface-subtle"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
