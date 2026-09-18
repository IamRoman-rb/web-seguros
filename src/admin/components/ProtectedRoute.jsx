import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checked } = useAuth()
  const location = useLocation()

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-page text-slate-500 text-sm">
        Cargando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute
