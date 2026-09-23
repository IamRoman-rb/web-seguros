import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteDataProvider } from './content/SiteDataContext'
import { AuthProvider } from './admin/AuthContext'
import Landing from './Landing'

// El panel de administración se carga en un chunk aparte para que los
// visitantes de la landing no descarguen ese código (gráficos, formularios, etc.).
const AdminApp = lazy(() => import('./admin/AdminApp'))

function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <Routes>
          <Route path="/admin/*" element={
            <AuthProvider>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">Cargando panel...</div>}>
                <AdminApp />
              </Suspense>
            </AuthProvider>
          } />
          <Route path="/*" element={<Landing />} />
        </Routes>
      </SiteDataProvider>
    </BrowserRouter>
  )
}

export default App
