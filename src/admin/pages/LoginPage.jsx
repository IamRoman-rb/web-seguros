import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IconLock, IconShieldLock } from '@tabler/icons-react'
import { useAuth } from '../AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(username, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-page px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
            <IconShieldLock size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-headline-sm text-navy-deep text-center">Panel de administración</h1>
          <p className="text-sm text-slate-500 text-center">Organización San Francisco</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Usuario</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary hover:bg-navy-deep text-white text-sm font-semibold disabled:opacity-50 transition-colors"
        >
          <IconLock size={16} />
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
