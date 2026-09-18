import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'

const Faq = () => {
  const { content } = useSiteData()
  const { faq } = content
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="w-full py-space-2xl bg-surface-page">
      <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center mb-space-2xl">
          <h2 className="font-heading text-headline-lg text-navy-deep">{faq?.title}</h2>
        </div>

        <div className="space-y-space-sm">
          {(faq?.items || []).map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="bg-surface-card rounded-xl p-space-md shadow-sm transition-all">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left font-heading text-title-lg text-navy-deep focus:outline-none"
                >
                  <span>{item.pregunta}</span>
                  <IconChevronDown size={22} className={`text-secondary flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="mt-space-sm pt-space-sm border-t border-border-subtle font-body text-body-md text-on-surface-variant">
                    {item.respuesta}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
