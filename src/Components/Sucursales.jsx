import { motion as Motion } from 'framer-motion'
import {
  IconMapPin, IconClock, IconMail, IconBrandWhatsapp, IconArrowRight,
  IconCamera, IconExternalLink,
} from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'

const Sucursales = () => {
  const { content } = useSiteData()
  const { sucursales } = content
  const branches = sucursales?.branches || []

  return (
    <section id="sucursales" className="w-full py-space-2xl bg-surface-subtle">
      <div id="contacto" className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <h2 className="font-heading text-headline-lg text-navy-deep max-w-xl">{sucursales?.title}</h2>
          <p className="font-body text-body-sm text-on-surface-variant max-w-md">{sucursales?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {branches.map((branch, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 bg-surface-card rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-success-badge animate-pulse" />
                    <span className="font-heading text-title-lg text-navy-deep">{branch.nombre}</span>
                  </div>
                  {branch.zona && (
                    <span className="font-heading text-label-sm uppercase px-2.5 py-1 rounded-full bg-surface-container text-secondary font-bold">
                      {branch.zona}
                    </span>
                  )}
                </div>

                <div className="space-y-space-sm mb-space-lg">
                  <div className="flex items-start gap-3">
                    <IconMapPin size={22} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading text-label-sm text-on-surface-variant block uppercase">Dirección</span>
                      <span className="font-body text-body-md text-on-surface">{branch.direccion}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconClock size={22} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading text-label-sm text-on-surface-variant block uppercase">Horarios de Atención</span>
                      <span className="font-body text-body-md text-on-surface">{branch.horario}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconMail size={22} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-heading text-label-sm text-on-surface-variant block uppercase">Correo Electrónico</span>
                      <a href={`mailto:${branch.email}`} className="font-body text-body-md text-secondary hover:underline break-all">
                        {branch.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-space-md border-t border-border-subtle flex flex-col sm:flex-row gap-space-sm">
                <a
                  href={waLink(branch.whatsapp, `Hola OSF ${branch.nombre}, quisiera hacer una consulta`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-space-md rounded-lg bg-surface-subtle hover:bg-surface-container text-primary font-heading text-label-md transition-colors"
                >
                  <IconBrandWhatsapp size={20} className="text-success-badge" />
                  <span className="truncate">WhatsApp: {branch.whatsapp}</span>
                </a>
                <a
                  href={waLink(branch.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-secondary hover:bg-navy-deep text-on-secondary font-heading text-label-md transition-colors"
                >
                  Contactar
                  <IconArrowRight size={16} />
                </a>
              </div>
            </Motion.div>
          ))}
        </div>

        {sucursales?.instagramUrl && (
          <div className="mt-space-lg p-space-lg rounded-xl bg-gradient-to-r from-primary-container to-navy-deep text-on-primary flex flex-col md:flex-row items-center justify-between gap-space-md shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-error to-secondary flex items-center justify-center flex-shrink-0 shadow">
                <IconCamera size={32} />
              </div>
              <div>
                <span className="font-heading text-label-sm uppercase tracking-wider text-secondary-fixed">Comunidad Oficial</span>
                <h3 className="font-heading text-headline-sm text-on-primary">Seguinos en Instagram: {sucursales.instagramHandle}</h3>
                <p className="font-body text-body-sm text-primary-fixed leading-normal">
                  Tips para el conductor, cambios de leyes de tránsito, prevención de siniestros y novedades en tiempo real.
                </p>
              </div>
            </div>
            <a
              href={sucursales.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-space-lg py-3 rounded-lg bg-surface-card hover:bg-surface-container text-navy-deep font-heading text-label-md transition-all flex-shrink-0 shadow"
            >
              Ver Perfil en Instagram
              <IconExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Sucursales
