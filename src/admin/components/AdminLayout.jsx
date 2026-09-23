import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  IconCalendarEvent, IconLayoutDashboard, IconUserCircle, IconLogout,
  IconExternalLink, IconChartBar, IconMenu2, IconX,
} from '@tabler/icons-react'
import { useAuth } from '../AuthContext'

const NAV = [
  { to: '/admin/estadisticas', label: 'Estadísticas', icon: IconChartBar },
  { to: '/admin/eventos', label: 'Eventos', icon: IconCalendarEvent },
  { to: '/admin/contenido', label: 'Contenido del sitio', icon: IconLayoutDashboard },
  { to: '/admin/cuenta', label: 'Mi cuenta', icon: IconUserCircle },
]

const AdminLayout = () => {
  const { logout, username } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface-page lg:flex">
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-primary text-white px-4 py-3 shadow-md">
        <span className="font-heading text-title-lg">Panel de administración</span>
        <button
          onClick={() => setMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10"
          aria-label="Abrir menú"
        >
          <IconMenu2 size={20} />
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`w-72 max-w-[85vw] bg-primary text-white flex flex-col flex-shrink-0 fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out
          lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:max-w-none lg:translate-x-0
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-5 border-b border-white/10 flex items-start justify-between">
          <div>
            <p className="font-heading text-headline-sm">Panel de administración</p>
            <p className="text-xs text-white/60 mt-1">{username}</p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/10"
            aria-label="Cerrar menú"
          >
            <IconX size={18} />
          </button>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <IconExternalLink size={18} />
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <IconLogout size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
