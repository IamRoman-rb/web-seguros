import { IconTrash, IconPlus } from '@tabler/icons-react'
import ImageField from './ImageField'

const ListEditor = ({ items, fields, onChange, addLabel = 'Agregar', emptyItem }) => {
  const updateItem = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    onChange(next)
  }

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const addItem = () => {
    onChange([...items, { ...emptyItem }])
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-4 flex flex-col gap-3 relative bg-slate-50/50">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors"
            aria-label="Eliminar"
          >
            <IconTrash size={18} />
          </button>
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1 pr-8">
              {field.type === 'image' ? (
                <ImageField
                  label={field.label}
                  value={item[field.key]}
                  onChange={(url) => updateItem(index, field.key, url)}
                />
              ) : (
                <>
                  <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      rows={3}
                      value={item[field.key] || ''}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={item[field.key] || ''}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:border-primary hover:text-primary transition-colors text-sm font-medium"
      >
        <IconPlus size={16} />
        {addLabel}
      </button>
    </div>
  )
}

export default ListEditor
