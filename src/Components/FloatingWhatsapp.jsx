import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'
import { trackClick } from '../api'

const FloatingWhatsapp = () => {
  const { content } = useSiteData()
  const branch = content.sucursales?.branches?.[0]
  if (!branch?.whatsapp) return null

  return (
    <a
      href={waLink(branch.whatsapp, 'Hola, quisiera hacer una consulta.')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick('floating_whatsapp')}
      aria-label="Escribinos por WhatsApp"
      className="fixed z-40 bottom-5 right-5 w-14 h-14 rounded-full bg-success-badge text-white flex items-center justify-center shadow-[0_12px_28px_-4px_rgba(11,37,69,0.35)] hover:scale-105 transition-transform"
    >
      <IconBrandWhatsapp size={30} />
    </a>
  )
}

export default FloatingWhatsapp
