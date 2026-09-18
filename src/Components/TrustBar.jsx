import { IconShieldCheck, IconBuildingStore, IconCertificate, IconHeadset } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'

const ICONS = [IconShieldCheck, IconBuildingStore, IconCertificate, IconHeadset]
const COLORS = ['text-secondary', 'text-error', 'text-secondary', 'text-success-badge']

const TrustBar = () => {
  const { content } = useSiteData()
  const items = content.trustbar || []

  return (
    <section className="w-full bg-surface-card shadow-sm py-space-md">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className={`w-12 h-12 rounded-xl bg-surface-subtle ${COLORS[index % COLORS.length]} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={28} stroke={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-headline-sm text-navy-deep">{item.value}</span>
                  <span className="font-heading text-label-sm uppercase tracking-wider text-on-surface-variant">{item.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustBar
