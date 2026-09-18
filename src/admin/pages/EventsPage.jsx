import { useState } from 'react'
import { IconPlus, IconTrash, IconPencil, IconCalendarEvent, IconX } from '@tabler/icons-react'
import { useSiteData } from '../../content/SiteDataContext'
import { api } from '../../api'

const emptyForm = { titulo: '', subtitulo: '', descripcion: '', ubicacion: '', fecha: '' }

function toDateInputValue(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

const EventsPage = () => {
  const { events, refreshEvents } = useSiteData()
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const startCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview(null)
    setError('')
    setShowForm(true)
  }

  const startEdit = (evento) => {
    setEditingId(evento.id)
    setForm({
      titulo: evento.titulo || '',
      subtitulo: evento.subtitulo || '',
      descripcion: evento.descripcion || '',
      ubicacion: evento.ubicacion || '',
      fecha: toDateInputValue(evento.fecha),
    })
    setImageFile(null)
    setImagePreview(evento.imagen || null)
    setError('')
    setShowForm(true)
  }

  const closeForm = () => setShowForm(false)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.titulo.trim()) {
      setError('El título es obligatorio')
      return
    }
    setSaving(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('titulo', form.titulo)
      formData.append('subtitulo', form.subtitulo)
      formData.append('descripcion', form.descripcion)
      formData.append('ubicacion', form.ubicacion)
      formData.append('fecha', form.fecha ? new Date(form.fecha).toISOString() : '')
      if (imageFile) formData.append('imagen', imageFile)

      if (editingId) {
        await api.updateEvent(editingId, formData)
      } else {
        await api.createEvent(formData)
      }
      await refreshEvents()
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este evento? Esta acción no se puede deshacer.')) return
    await api.deleteEvent(id)
    await refreshEvents()
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Eventos</h2>
          <p className="text-slate-500 text-sm">Publicá novedades, torneos y actividades para mostrar en la landing.</p>
        </div>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-navy-deep text-white text-sm font-semibold transition-colors"
        >
          <IconPlus size={18} />
          Nuevo evento
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">{editingId ? 'Editar evento' : 'Nuevo evento'}</h3>
            <button type="button" onClick={closeForm} className="text-slate-400 hover:text-slate-700">
              <IconX size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Título</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.titulo}
              onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Subtítulo (opcional)</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.subtitulo}
              onChange={(e) => setForm((f) => ({ ...f, subtitulo: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">Ubicación</label>
              <input
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.ubicacion}
                onChange={(e) => setForm((f) => ({ ...f, ubicacion: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-700">Fecha</label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={form.fecha}
                onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-700">Descripción</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.descripcion}
              onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Imagen</label>
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                {imagePreview ? <img src={imagePreview} alt="" className="w-full h-full object-cover" /> : <IconCalendarEvent className="text-slate-300" size={28} />}
              </div>
              <label className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium cursor-pointer transition-colors">
                Elegir imagen
                <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </label>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-navy-deep text-white text-sm font-semibold disabled:opacity-50 transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar evento'}
            </button>
            <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {events.length === 0 && (
          <p className="text-slate-500 text-sm">Todavía no cargaste ningún evento.</p>
        )}
        {events.map((evento) => (
          <div key={evento.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {evento.imagen ? <img src={evento.imagen} alt="" className="w-full h-full object-cover" /> : <IconCalendarEvent className="text-slate-300" size={24} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate">{evento.titulo}</p>
              <p className="text-sm text-slate-500 truncate">{evento.ubicacion} {evento.fecha ? `· ${toDateInputValue(evento.fecha)}` : ''}</p>
            </div>
            <button onClick={() => startEdit(evento)} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Editar">
              <IconPencil size={18} />
            </button>
            <button onClick={() => handleDelete(evento.id)} className="w-9 h-9 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50" aria-label="Eliminar">
              <IconTrash size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsPage
