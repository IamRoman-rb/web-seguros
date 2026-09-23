import { useSectionDraft } from '../useSectionDraft'
import SectionShell, { TextField, ColorField } from '../components/SectionShell'
import ImageField from '../components/ImageField'
import ListEditor from '../components/ListEditor'
import CotizadoresEditor from '../components/CotizadoresEditor'

function Section({ section, title, description, defaultOpen, children }) {
  const { draft, update, save, status, dirty } = useSectionDraft(section)
  return (
    <SectionShell title={title} description={description} status={status} dirty={dirty} onSave={save} defaultOpen={defaultOpen}>
      {children(draft, update)}
    </SectionShell>
  )
}

const ContentPage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Contenido del sitio</h2>
        <p className="text-slate-500 text-sm">Editá los textos, títulos e imágenes que se muestran en la landing. Los cambios se ven en el sitio apenas los guardás.</p>
      </div>

      <Section section="meta" title="Marca del sitio" description="Nombre y logo" defaultOpen>
        {(draft, update) => (
          <>
            <TextField label="Nombre del sitio" value={draft.siteName} onChange={(v) => update((d) => ({ ...d, siteName: v }))} />
            <ImageField label="Logo" value={draft.logoUrl} onChange={(url) => update((d) => ({ ...d, logoUrl: url }))} />
          </>
        )}
      </Section>

      <Section section="theme" title="Colores del sitio" description="Color azul principal y rojo de acento. El resto de los tonos (fondos, hover, etc.) se calculan automáticamente a partir de estos dos.">
        {(draft, update) => (
          <>
            <ColorField label="Azul principal" value={draft.primaryColor} onChange={(v) => update((d) => ({ ...d, primaryColor: v }))} />
            <ColorField label="Rojo de acento" value={draft.accentColor} onChange={(v) => update((d) => ({ ...d, accentColor: v }))} />
          </>
        )}
      </Section>

      <Section section="header" title="Barra superior" description="Mensaje y horario que aparecen arriba del menú">
        {(draft, update) => (
          <>
            <TextField label="Texto de sucursales" value={draft.topbarText} onChange={(v) => update((d) => ({ ...d, topbarText: v }))} />
            <TextField label="Texto de horario" value={draft.topbarHoursText} onChange={(v) => update((d) => ({ ...d, topbarHoursText: v }))} />
          </>
        )}
      </Section>

      <Section section="hero" title="Portada principal" description="Título, subtítulo y textos destacados">
        {(draft, update) => (
          <>
            <TextField label="Badge 1" value={draft.badge1} onChange={(v) => update((d) => ({ ...d, badge1: v }))} />
            <TextField label="Badge 2" value={draft.badge2} onChange={(v) => update((d) => ({ ...d, badge2: v }))} />
            <TextField label="Título (antes de la palabra destacada)" value={draft.titleBeforeHighlight} onChange={(v) => update((d) => ({ ...d, titleBeforeHighlight: v }))} />
            <TextField label="Palabra destacada" value={draft.titleHighlight} onChange={(v) => update((d) => ({ ...d, titleHighlight: v }))} />
            <TextField label="Título (después de la palabra destacada)" value={draft.titleAfterHighlight} onChange={(v) => update((d) => ({ ...d, titleAfterHighlight: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <TextField label="Texto del botón principal" value={draft.ctaText} onChange={(v) => update((d) => ({ ...d, ctaText: v }))} />
            <TextField label="Título del destacado (vehículos +20 años)" value={draft.miniHighlightTitle} onChange={(v) => update((d) => ({ ...d, miniHighlightTitle: v }))} />
            <TextField label="Texto del destacado" textarea value={draft.miniHighlightText} onChange={(v) => update((d) => ({ ...d, miniHighlightText: v }))} />
          </>
        )}
      </Section>

      <Section section="cotizadores" title="Cotizador Express" description="Tipos de seguro y campos que se muestran en el formulario de cotización rápida de la portada">
        {(draft, update) => (
          <CotizadoresEditor
            categories={draft.categories || []}
            onChange={(categories) => update((d) => ({ ...d, categories }))}
          />
        )}
      </Section>

      <Section section="trustbar" title="Estadísticas de confianza" description="Los 4 datos destacados debajo de la portada">
        {(draft, update) => (
          <ListEditor
            items={draft}
            onChange={(items) => update(items)}
            emptyItem={{ value: '', label: '' }}
            addLabel="Agregar estadística"
            fields={[
              { key: 'value', label: 'Valor (ej: +40 años)' },
              { key: 'label', label: 'Descripción' },
            ]}
          />
        )}
      </Section>

      <Section section="elegirnos" title="¿Por qué elegirnos?" description="4 razones para elegir la correduría">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <ListEditor
              items={draft.items || []}
              onChange={(items) => update((d) => ({ ...d, items }))}
              emptyItem={{ title: '', description: '' }}
              addLabel="Agregar ítem"
              fields={[
                { key: 'title', label: 'Título' },
                { key: 'description', label: 'Descripción', type: 'textarea' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="vehiculosAntiguos" title="Vehículos +20 años" description="Sección destacada de vehículos clásicos">
        {(draft, update) => (
          <>
            <TextField label="Texto del badge" value={draft.badge} onChange={(v) => update((d) => ({ ...d, badge: v }))} />
            <TextField label="Título" textarea value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Descripción" textarea value={draft.description} onChange={(v) => update((d) => ({ ...d, description: v }))} />
            <ImageField label="Imagen" value={draft.image} onChange={(url) => update((d) => ({ ...d, image: url }))} />
            <TextField label="Texto sobre la imagen" value={draft.imageCaption} onChange={(v) => update((d) => ({ ...d, imageCaption: v }))} />
            <p className="text-sm font-semibold text-slate-700 mt-2">Características destacadas</p>
            <ListEditor
              items={draft.features || []}
              onChange={(features) => update((d) => ({ ...d, features }))}
              emptyItem={{ title: '', description: '' }}
              addLabel="Agregar característica"
              fields={[
                { key: 'title', label: 'Título' },
                { key: 'description', label: 'Descripción', type: 'textarea' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="coberturas" title="Coberturas" description="Grilla de tipos de seguro que ofrecés">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <ListEditor
              items={draft.items || []}
              onChange={(items) => update((d) => ({ ...d, items }))}
              emptyItem={{ title: '', description: '' }}
              addLabel="Agregar cobertura"
              fields={[
                { key: 'title', label: 'Título' },
                { key: 'description', label: 'Descripción', type: 'textarea' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="aseguradoras" title="Aseguradoras aliadas" description="Logos de las compañías con las que trabajás">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <ListEditor
              items={draft.logos || []}
              onChange={(logos) => update((d) => ({ ...d, logos }))}
              emptyItem={{ name: '', image: '' }}
              addLabel="Agregar compañía"
              fields={[
                { key: 'name', label: 'Nombre' },
                { key: 'image', label: 'Logo', type: 'image' },
              ]}
            />
            <TextField label="Título del recuadro informativo" value={draft.infoTitle} onChange={(v) => update((d) => ({ ...d, infoTitle: v }))} />
            <TextField label="Texto del recuadro informativo" textarea value={draft.infoText} onChange={(v) => update((d) => ({ ...d, infoText: v }))} />
          </>
        )}
      </Section>

      <Section section="comoTrabajamos" title="Cómo trabajamos" description="Pasos del proceso de contratación">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <ListEditor
              items={draft.steps || []}
              onChange={(steps) => update((d) => ({ ...d, steps }))}
              emptyItem={{ title: '', description: '' }}
              addLabel="Agregar paso"
              fields={[
                { key: 'title', label: 'Título' },
                { key: 'description', label: 'Descripción', type: 'textarea' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="sucursales" title="Sucursales" description="Direcciones, horarios y contacto de cada oficina">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
            <TextField label="Usuario de Instagram" value={draft.instagramHandle} onChange={(v) => update((d) => ({ ...d, instagramHandle: v }))} />
            <TextField label="Link de Instagram" value={draft.instagramUrl} onChange={(v) => update((d) => ({ ...d, instagramUrl: v }))} />
            <p className="text-sm font-semibold text-slate-700 mt-2">Sucursales</p>
            <ListEditor
              items={draft.branches || []}
              onChange={(branches) => update((d) => ({ ...d, branches }))}
              emptyItem={{ nombre: '', zona: '', direccion: '', horario: '', email: '', whatsapp: '' }}
              addLabel="Agregar sucursal"
              fields={[
                { key: 'nombre', label: 'Nombre de la sucursal' },
                { key: 'zona', label: 'Zona / Región' },
                { key: 'direccion', label: 'Dirección' },
                { key: 'horario', label: 'Horario de atención' },
                { key: 'email', label: 'Email' },
                { key: 'whatsapp', label: 'WhatsApp (solo números, con código de país. Ej: 5491125957130)' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="eventos" title="Eventos (encabezado)" description="Título y bajada de la sección de eventos">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
          </>
        )}
      </Section>

      <Section section="faq" title="Preguntas frecuentes" description="Preguntas y respuestas del acordeón">
        {(draft, update) => (
          <>
            <TextField label="Título de la sección" value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <ListEditor
              items={draft.items || []}
              onChange={(items) => update((d) => ({ ...d, items }))}
              emptyItem={{ pregunta: '', respuesta: '' }}
              addLabel="Agregar pregunta"
              fields={[
                { key: 'pregunta', label: 'Pregunta' },
                { key: 'respuesta', label: 'Respuesta', type: 'textarea' },
              ]}
            />
          </>
        )}
      </Section>

      <Section section="finalCta" title="Banner final" description="Llamado a la acción antes del pie de página">
        {(draft, update) => (
          <>
            <TextField label="Texto pequeño superior" value={draft.eyebrow} onChange={(v) => update((d) => ({ ...d, eyebrow: v }))} />
            <TextField label="Título" textarea value={draft.title} onChange={(v) => update((d) => ({ ...d, title: v }))} />
            <TextField label="Subtítulo" textarea value={draft.subtitle} onChange={(v) => update((d) => ({ ...d, subtitle: v }))} />
          </>
        )}
      </Section>

      <Section section="footer" title="Pie de página" description="Frase institucional y línea legal">
        {(draft, update) => (
          <>
            <TextField label="Frase institucional" textarea value={draft.slogan} onChange={(v) => update((d) => ({ ...d, slogan: v }))} />
            <TextField label="Línea legal" textarea value={draft.legalLine} onChange={(v) => update((d) => ({ ...d, legalLine: v }))} />
          </>
        )}
      </Section>
    </div>
  )
}

export default ContentPage
