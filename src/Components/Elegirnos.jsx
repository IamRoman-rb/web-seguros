import { motion as Motion } from 'framer-motion'
import { IconUserShield, IconHeadset, IconShieldCheck, IconTrendingUp } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'

const ICONS = [IconUserShield, IconHeadset, IconShieldCheck, IconTrendingUp]

const Elegirnos = () => {
  const { content } = useSiteData()
  const { elegirnos } = content

  return (
    <section id="elegirnos" className="w-full py-space-2xl bg-surface-page">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-2xl">
          <h2 className="font-heading text-headline-lg text-navy-deep mb-space-sm">{elegirnos?.title}</h2>
          <p className="font-body text-body-md text-on-surface-variant">{elegirnos?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {(elegirnos?.items || []).map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-surface-card p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-surface-container text-secondary flex items-center justify-center mb-space-md">
                  <Icon size={32} stroke={1.5} />
                </div>
                <h3 className="font-heading text-title-lg text-navy-deep mb-space-xs">{item.title}</h3>
                <p className="font-body text-body-sm text-on-surface-variant">{item.description}</p>
              </Motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Elegirnos
