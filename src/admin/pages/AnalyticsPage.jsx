import { useEffect, useState } from 'react'
import { IconEye, IconClick, IconCalendarStats, IconRefresh } from '@tabler/icons-react'
import { api } from '../../api'
import DailyBarChart from '../components/DailyBarChart'
import HorizontalBarList from '../components/HorizontalBarList'
import { formatEventLabel, formatPageLabel } from '../analyticsLabels'

const DAYS_TO_SHOW = 14

function lastNDays(n) {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const date = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
    days.push({ date, label })
  }
  return days
}

function buildSeries(byDay) {
  return lastNDays(DAYS_TO_SHOW).map(({ date, label }) => ({
    date,
    label,
    value: byDay?.[date] || 0,
  }))
}

function topEntries(map, formatLabel, limit = 8) {
  return Object.entries(map || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, value]) => ({ key, value, label: formatLabel(key) }))
}

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
    <div className="w-11 h-11 rounded-xl bg-surface-subtle text-primary flex items-center justify-center flex-shrink-0">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
)

const AnalyticsPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const summary = await api.getAnalyticsSummary()
      setData(summary)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading && !data) {
    return <p className="text-slate-500 text-sm">Cargando estadísticas...</p>
  }

  if (error && !data) {
    return <p className="text-red-600 text-sm">{error}</p>
  }

  const pageviewSeries = buildSeries(data.pageviewsByDay)
  const clickSeries = buildSeries(data.clicksByDay)
  const todayKey = new Date().toISOString().slice(0, 10)
  const pageviewsToday = data.pageviewsByDay?.[todayKey] || 0
  const pageviewsWeek = pageviewSeries.slice(-7).reduce((sum, d) => sum + d.value, 0)
  const topPages = topEntries(data.pageviewsByPath, formatPageLabel)
  const topClicks = topEntries(data.clicksByLabel, formatEventLabel)

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Estadísticas del sitio</h2>
          <p className="text-slate-500 text-sm">Visitas y clics registrados en la landing. Se actualiza en tiempo real a medida que entran visitantes.</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors flex-shrink-0"
        >
          <IconRefresh size={16} />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={IconEye} label="Visitas totales" value={data.totalPageviews || 0} />
        <StatCard icon={IconCalendarStats} label="Visitas hoy" value={pageviewsToday} />
        <StatCard icon={IconCalendarStats} label="Visitas últimos 7 días" value={pageviewsWeek} />
        <StatCard icon={IconClick} label="Clics totales" value={data.totalClicks || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Visitas por día (últimos {DAYS_TO_SHOW} días)</h3>
          <DailyBarChart data={pageviewSeries} color="#0B2545" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Clics por día (últimos {DAYS_TO_SHOW} días)</h3>
          <DailyBarChart data={clickSeries} color="#D90429" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Botones y links más usados</h3>
          <HorizontalBarList data={topClicks} color="#D90429" emptyLabel="Todavía no se registraron clics." />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Páginas más visitadas</h3>
          <HorizontalBarList data={topPages} color="#0B2545" emptyLabel="Todavía no se registraron visitas." />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
