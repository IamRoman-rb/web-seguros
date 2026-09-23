import { IconTrash, IconPlus, IconGripVertical } from '@tabler/icons-react'

const TYPE_OPTIONS = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'checkbox', label: 'Sí / No' },
  { value: 'select', label: 'Lista desplegable' },
]

const inputClass = 'rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'

const emptyField = { label: '', type: 'text' }
const emptyCategory = () => ({ label: '', fields: [{ ...emptyField }] })

const CotizadoresEditor = ({ categories, onChange }) => {
  const updateCategory = (index, updater) => {
    onChange(categories.map((cat, i) => (i === index ? updater(cat) : cat)))
  }

  const removeCategory = (index) => {
    onChange(categories.filter((_, i) => i !== index))
  }

  const addCategory = () => {
    onChange([...categories, emptyCategory()])
  }

  return (
    <div className="flex flex-col gap-5">
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconGripVertical size={16} className="text-slate-300 flex-shrink-0" />
            <input
              className={`${inputClass} flex-1 min-w-0 font-semibold`}
              placeholder="Nombre del tipo de seguro (ej: Automotor)"
              value={category.label}
              onChange={(e) => updateCategory(catIndex, (c) => ({ ...c, label: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => removeCategory(catIndex)}
              className="text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
              aria-label="Eliminar tipo de seguro"
            >
              <IconTrash size={18} />
            </button>
          </div>

          <div className="pl-6 flex flex-col gap-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Campos del formulario</p>
            {category.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex flex-col gap-2 bg-white border border-slate-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <input
                    className={`${inputClass} flex-1 min-w-0`}
                    placeholder="Etiqueta del campo (ej: Marca y Modelo)"
                    value={field.label}
                    onChange={(e) =>
                      updateCategory(catIndex, (c) => ({
                        ...c,
                        fields: c.fields.map((f, i) => (i === fieldIndex ? { ...f, label: e.target.value } : f)),
                      }))
                    }
                  />
                  <select
                    className={`${inputClass} w-40 flex-shrink-0`}
                    value={field.type}
                    onChange={(e) =>
                      updateCategory(catIndex, (c) => ({
                        ...c,
                        fields: c.fields.map((f, i) => (i === fieldIndex ? { ...f, type: e.target.value } : f)),
                      }))
                    }
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      updateCategory(catIndex, (c) => ({ ...c, fields: c.fields.filter((_, i) => i !== fieldIndex) }))
                    }
                    className="text-slate-400 hover:text-red-600 transition-colors flex-shrink-0"
                    aria-label="Eliminar campo"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
                {field.type === 'select' && (
                  <input
                    className={`${inputClass} w-full`}
                    placeholder="Opciones separadas por coma (ej: Casa, Departamento, PH)"
                    value={(field.options || []).join(', ')}
                    onChange={(e) =>
                      updateCategory(catIndex, (c) => ({
                        ...c,
                        fields: c.fields.map((f, i) =>
                          i === fieldIndex
                            ? { ...f, options: e.target.value.split(',').map((o) => o.trim()).filter(Boolean) }
                            : f
                        ),
                      }))
                    }
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                updateCategory(catIndex, (c) => ({ ...c, fields: [...c.fields, { ...emptyField }] }))
              }
              className="inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:border-primary hover:text-primary transition-colors text-sm font-medium"
            >
              <IconPlus size={14} />
              Agregar campo
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCategory}
        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:border-primary hover:text-primary transition-colors text-sm font-medium"
      >
        <IconPlus size={16} />
        Agregar tipo de seguro
      </button>
    </div>
  )
}

export default CotizadoresEditor
