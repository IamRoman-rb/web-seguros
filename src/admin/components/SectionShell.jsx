import { useState } from 'react'
import { IconChevronDown, IconDeviceFloppy } from '@tabler/icons-react'

const SectionShell = ({ title, description, status, dirty, onSave, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        <IconChevronDown size={20} className={`text-slate-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 flex flex-col gap-4">
          {children}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onSave}
              disabled={!dirty || status === 'saving'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-deep transition-colors"
            >
              <IconDeviceFloppy size={16} />
              {status === 'saving' ? 'Guardando...' : 'Guardar cambios'}
            </button>
            {status === 'saved' && <span className="text-sm text-success-badge font-medium">Guardado ✓</span>}
            {status?.startsWith('error') && <span className="text-sm text-red-600">{status.replace('error: ', '')}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export const TextField = ({ label, value, onChange, textarea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    {textarea ? (
      <textarea
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        rows={3}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
)

export default SectionShell
