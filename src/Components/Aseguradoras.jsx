import { motion as Motion } from 'framer-motion'
import { IconHelpCircle } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'

const Aseguradoras = () => {
  const { content } = useSiteData()
  const { aseguradoras } = content

  return (
    <section id="aseguradoras" className="w-full py-space-2xl bg-surface-subtle overflow-hidden">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <h2 className="font-heading text-headline-lg text-navy-deep max-w-xl">{aseguradoras?.title}</h2>
          <p className="font-body text-body-sm text-on-surface-variant max-w-md">{aseguradoras?.subtitle}</p>
        </div>

        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-sm"
        >
          {(aseguradoras?.logos || []).map((logo, index) => (
            <div
              key={index}
              className="bg-surface-card p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center h-28"
            >
              <img src={logo.image} alt={logo.name} className="max-h-12 max-w-[85%] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="font-heading text-label-sm text-on-surface-variant mt-2 truncate w-full">{logo.name}</span>
            </div>
          ))}
        </Motion.div>

        <div className="mt-space-lg p-space-md rounded-xl bg-surface-card flex flex-col sm:flex-row items-center gap-space-md shadow-sm">
          <div className="w-10 h-10 rounded-full bg-error/15 text-error flex items-center justify-center flex-shrink-0">
            <IconHelpCircle size={24} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-heading text-title-lg text-navy-deep">{aseguradoras?.infoTitle}</h4>
            <p className="font-body text-body-sm text-on-surface-variant">{aseguradoras?.infoText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aseguradoras
