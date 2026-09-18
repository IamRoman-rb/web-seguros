import { useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../AuthContext'

const AccountPage = () => {
  const { username } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('')
    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden')
      return
    }
    try {
      await api.changePassword(currentPassword, newPassword)
      setStatus('Contraseña actualizada correctamente')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold text-slate-800 mb-1">Mi cuenta</h2>
      <p className="text-slate-500 text-sm mb-6">Sesión iniciada como <strong>{username}</strong></p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
        <h3 className="font-semibold text-slate-800">Cambiar contraseña</h3>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Contraseña actual</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Nueva contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Repetir nueva contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {status && <p className="text-sm text-success-badge">{status}</p>}

        <button
          type="submit"
          className="self-start px-4 py-2 rounded-lg bg-primary hover:bg-navy-deep text-white text-sm font-semibold transition-colors"
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  )
}

export default AccountPage
