import { motion as Motion } from 'framer-motion'
import { IconCalendarEvent, IconMapPin } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch {
    return ''
  }
}

const Eventos = () => {
  const { content, events, eventsLoaded } = useSiteData()
  const { eventos } = content

  return (
    <section id="eventos" className="w-full py-space-2xl bg-surface-subtle">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-2xl">
          <h2 className="font-heading text-headline-lg text-navy-deep mb-space-sm">{eventos?.title}</h2>
          <p className="font-body text-body-md text-on-surface-variant">{eventos?.subtitle}</p>
        </div>

        {events.length === 0 && eventsLoaded && (
          <p className="text-center font-body text-body-md text-on-surface-variant">
            Próximamente nuevos eventos. ¡Seguinos en Instagram para no perderte ninguno!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {events.map((evento, index) => (
            <Motion.article
              key={evento.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {evento.imagen && (
                <img src={evento.imagen} alt={evento.titulo} className="w-full h-48 object-cover" />
              )}
              <div className="p-space-lg flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-secondary font-heading text-label-sm uppercase tracking-wide">
                  <IconCalendarEvent size={18} />
                  {formatDate(evento.fecha)}
                </div>
                <h3 className="font-heading text-title-lg text-navy-deep">{evento.titulo}</h3>
                {evento.subtitulo && (
                  <p className="font-heading text-label-md text-secondary">{evento.subtitulo}</p>
                )}
                {evento.ubicacion && (
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-body text-body-sm">
                    <IconMapPin size={16} />
                    {evento.ubicacion}
                  </div>
                )}
                {evento.descripcion && (
                  <p className="font-body text-body-sm text-on-surface-variant mt-1">{evento.descripcion}</p>
                )}
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Eventos
