import { motion as Motion } from 'framer-motion'
import { useSiteData } from '../content/SiteDataContext'

const NUMBER_COLORS = ['text-border-subtle', 'text-secondary/30', 'text-secondary/30', 'text-error/30']

const ComoTrabajamos = () => {
  const { content } = useSiteData()
  const { comoTrabajamos } = content

  return (
    <section className="w-full py-space-2xl bg-surface-page">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-space-2xl">
          <h2 className="font-heading text-headline-lg text-navy-deep mb-space-sm">{comoTrabajamos?.title}</h2>
          <p className="font-body text-body-md text-on-surface-variant">{comoTrabajamos?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {(comoTrabajamos?.steps || []).map((step, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-surface-card p-space-lg rounded-xl shadow-sm flex flex-col"
            >
              <span className={`font-heading text-headline-xl font-extrabold mb-space-sm ${NUMBER_COLORS[index % NUMBER_COLORS.length]}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-title-lg text-navy-deep mb-space-xs">{step.title}</h3>
              <p className="font-body text-body-sm text-on-surface-variant">{step.description}</p>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComoTrabajamos
