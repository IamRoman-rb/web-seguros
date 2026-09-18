import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteDataProvider } from './content/SiteDataContext'
import { AuthProvider } from './admin/AuthContext'
import Landing from './Landing'
import AdminApp from './admin/AdminApp'

function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <Routes>
          <Route path="/admin/*" element={
            <AuthProvider>
              <AdminApp />
            </AuthProvider>
          } />
          <Route path="/*" element={<Landing />} />
        </Routes>
      </SiteDataProvider>
    </BrowserRouter>
  )
}

export default App
