// Lista de barras horizontales para rankings { label, value }.
const HorizontalBarList = ({ data, color = '#0B2545', emptyLabel = 'Sin datos todavía' }) => {
  if (!data.length) {
    return <p className="text-sm text-slate-400 py-4">{emptyLabel}</p>
  }

  const max = Math.max(1, ...data.map((d) => d.value))

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((d) => (
        <div key={d.key} className="flex items-center gap-3">
          <span className="w-40 shrink-0 text-sm text-slate-600 truncate" title={d.label}>
            {d.label}
          </span>
          <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-sm font-semibold text-slate-700">{d.value}</span>
        </div>
      ))}
    </div>
  )
}

export default HorizontalBarList
