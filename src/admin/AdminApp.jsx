import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import LoginPage from './pages/LoginPage'
import EventsPage from './pages/EventsPage'
import ContentPage from './pages/ContentPage'
import AccountPage from './pages/AccountPage'
import AnalyticsPage from './pages/AnalyticsPage'

const AdminApp = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="estadisticas" replace />} />
        <Route path="estadisticas" element={<AnalyticsPage />} />
        <Route path="eventos" element={<EventsPage />} />
        <Route path="contenido" element={<ContentPage />} />
        <Route path="cuenta" element={<AccountPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default AdminApp
