import { createContext, useContext, useState } from 'react'

const AdminAuthContext = createContext(null)
export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(() => localStorage.getItem('milfleur-admin') === 'true')
  const login = () => { localStorage.setItem('milfleur-admin', 'true'); setAuthenticated(true) }
  const logout = () => { localStorage.removeItem('milfleur-admin'); setAuthenticated(false) }
  return <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AdminAuthContext.Provider>
}
export const useAdminAuth = () => useContext(AdminAuthContext)
