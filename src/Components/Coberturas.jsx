import { motion as Motion } from 'framer-motion'
import {
  IconCar, IconMotorbike, IconHome, IconBuildingStore, IconTool,
  IconShieldHalf, IconUsers, IconTruck, IconHeart, IconBuildingCommunity,
  IconFileCertificate, IconFlame, IconBike, IconAnchor, IconScooterElectric,
  IconArrowRight,
} from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { trackClick } from '../api'

const ICON_RULES = [
  [/moto(vehículo)?s?\b/i, IconMotorbike],
  [/monopat[íi]n/i, IconScooterElectric],
  [/ciclist|bicicleta/i, IconBike],
  [/auto|automotor|vehículo/i, IconCar],
  [/hogar|incendio/i, IconHome],
  [/comercio|industria|pyme/i, IconBuildingStore],
  [/t[ée]cnico/i, IconTool],
  [/responsabilidad civil/i, IconShieldHalf],
  [/accidentes personales/i, IconUsers],
  [/transporte/i, IconTruck],
  [/vida|retiro/i, IconHeart],
  [/consorcio/i, IconBuildingCommunity],
  [/cauci[óo]n/i, IconFileCertificate],
  [/art|riesgos del trabajo/i, IconFileCertificate],
  [/embarcaci[óo]n|n[áa]utic/i, IconAnchor],
]
const FALLBACK_ICONS = [IconShieldHalf, IconCar, IconHome, IconBuildingStore]

function pickIcon(title, index) {
  const match = ICON_RULES.find(([re]) => re.test(title))
  return match ? match[1] : FALLBACK_ICONS[index % FALLBACK_ICONS.length]
}

const Coberturas = () => {
  const { content } = useSiteData()
  const { coberturas } = content

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  return (
    <section id="coberturas" className="w-full py-space-2xl bg-surface-page">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-2xl">
          <h2 className="font-heading text-headline-lg text-navy-deep mb-space-sm">{coberturas?.title}</h2>
          <p className="font-body text-body-md text-on-surface-variant">{coberturas?.subtitle}</p>
        </div>

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg"
        >
          {(coberturas?.items || []).map((item, index) => {
            const Icon = pickIcon(item.title, index)
            return (
              <Motion.div
                key={index}
                variants={cardVariants}
                className="bg-surface-card p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-secondary flex items-center justify-center mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <Icon size={28} stroke={1.5} />
                  </div>
                  <h3 className="font-heading text-title-lg text-navy-deep mb-space-xs">{item.title}</h3>
                  <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-space-sm mt-space-md border-t border-border-subtle flex items-center justify-end">
                  <a
                    href="#cotizador-rapido"
                    onClick={() => trackClick('coberturas_consultar')}
                    className="font-heading text-label-md text-navy-deep hover:text-error flex items-center gap-1 transition-colors"
                  >
                    Consultar <IconArrowRight size={16} />
                  </a>
                </div>
              </Motion.div>
            )
          })}
        </Motion.div>
      </div>
    </section>
  )
}

export default Coberturas
