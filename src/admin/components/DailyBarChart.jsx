// Gráfico de barras simple (sin dependencias) para series diarias { date, value }.
const DailyBarChart = ({ data, color = '#0B2545', height = 140, emptyLabel = 'Sin datos todavía' }) => {
  const max = Math.max(1, ...data.map((d) => d.value))
  const hasData = data.some((d) => d.value > 0)

  if (!hasData) {
    return (
      <div className="flex items-center justify-center text-sm text-slate-400" style={{ height }}>
        {emptyLabel}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((d) => (
          <div key={d.date} className="flex-1 h-full flex items-end" title={`${d.label}: ${d.value}`}>
            <div
              className="w-full rounded-t transition-all hover:opacity-80"
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%`, backgroundColor: color }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1.5">
        <span>{data[0]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  )
}

export default DailyBarChart
