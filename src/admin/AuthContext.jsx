import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null)
  const [checked, setChecked] = useState(false)

  const check = useCallback(async () => {
    try {
      const data = await api.me()
      setUsername(data.authenticated ? data.username : null)
    } catch {
      setUsername(null)
    } finally {
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    check()
  }, [check])

  const login = useCallback(async (user, password) => {
    const data = await api.login(user, password)
    setUsername(data.username)
    return data
  }, [])

  const logout = useCallback(async () => {
    await api.logout()
    setUsername(null)
  }, [])

  const value = useMemo(
    () => ({ username, isAuthenticated: !!username, checked, login, logout }),
    [username, checked, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
