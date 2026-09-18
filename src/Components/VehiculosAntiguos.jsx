import { motion as Motion } from 'framer-motion'
import { IconStars, IconCheck, IconCar, IconShieldCheck } from '@tabler/icons-react'
import { useSiteData } from '../content/SiteDataContext'
import { waLink } from '../utils/whatsapp'

const VehiculosAntiguos = () => {
  const { content } = useSiteData()
  const { vehiculosAntiguos, sucursales } = content
  const branch = sucursales?.branches?.[0]

  return (
    <section id="vehiculos-antiguos" className="w-full py-space-2xl bg-surface-subtle">
      <div className="max-w-container mx-auto px-margin-mobile md:px-margin">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-space-lg md:p-space-xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error text-on-error font-heading text-label-sm uppercase tracking-widest mb-space-md">
                  <IconStars size={16} />
                  {vehiculosAntiguos?.badge}
                </div>
                <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-primary mb-space-sm leading-tight">
                  {vehiculosAntiguos?.title}
                </h2>
                <p className="font-body text-body-lg text-primary-fixed mb-space-lg">
                  {vehiculosAntiguos?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-xl">
                  {(vehiculosAntiguos?.features || []).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-error/20 text-error flex items-center justify-center flex-shrink-0 mt-0.5">
                        <IconCheck size={18} />
                      </div>
                      <div>
                        <h3 className="font-heading text-title-lg text-on-primary">{feature.title}</h3>
                        <p className="font-body text-body-sm text-primary-fixed-dim">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-md pt-space-md border-t border-white/20">
                <a
                  href={waLink(branch?.whatsapp, 'Hola, quisiera cotizar un auto con más de 20 años de antigüedad.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-space-lg py-3 rounded bg-error hover:bg-accent-red-hover text-on-error font-heading text-label-md uppercase tracking-wider transition-all shadow-md"
                >
                  <IconCar size={20} />
                  Cotizar Auto +20 Años por WhatsApp
                </a>
                <span className="font-body text-body-sm text-primary-fixed-dim">
                  Atención directa con productor asesor matriculado.
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative bg-primary min-h-[280px] lg:min-h-[340px] flex items-center justify-center p-space-lg">
              <img
                src={vehiculosAntiguos?.image}
                alt="Vehículo clásico asegurado"
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent rounded-xl pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-white/95 backdrop-blur-md text-on-surface shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <IconShieldCheck size={22} className="text-error" />
                    <span className="font-heading text-label-md text-navy-deep">{vehiculosAntiguos?.imageCaption}</span>
                  </div>
                  <span className="font-heading text-label-sm text-success-badge font-bold uppercase whitespace-nowrap">Aprobado</span>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default VehiculosAntiguos
