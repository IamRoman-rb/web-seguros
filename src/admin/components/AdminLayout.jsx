import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { IconCalendarEvent, IconLayoutDashboard, IconUserCircle, IconLogout, IconExternalLink } from '@tabler/icons-react'
import { useAuth } from '../AuthContext'

const NAV = [
  { to: '/admin/eventos', label: 'Eventos', icon: IconCalendarEvent },
  { to: '/admin/contenido', label: 'Contenido del sitio', icon: IconLayoutDashboard },
  { to: '/admin/cuenta', label: 'Mi cuenta', icon: IconUserCircle },
]

const AdminLayout = () => {
  const { logout, username } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface-page flex">
      <aside className="w-64 bg-primary text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <p className="font-heading text-headline-sm">Panel de administración</p>
          <p className="text-xs text-white/60 mt-1">{username}</p>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
