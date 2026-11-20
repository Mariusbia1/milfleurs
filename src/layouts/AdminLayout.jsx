import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Shapes, ShoppingCart, Images, Quote,
  FileText, Settings, User, LogOut, Search, Bell, Menu, X, ChevronRight, Store,
} from 'lucide-react'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import InstallAppButton from '../components/common/InstallAppButton'

const nav = [
  ['/admin', LayoutDashboard, 'Tableau de bord'],
  ['/admin/produits', Package, 'Produits'],
  ['/admin/categories', Shapes, 'Catégories'],
  ['/admin/commandes', ShoppingCart, 'Commandes'],
  ['/admin/galerie', Images, 'Galerie'],
  ['/admin/temoignages', Quote, 'Témoignages'],
  ['/admin/contenus', FileText, 'Contenus'],
  ['/admin/parametres', Settings, 'Paramètres'],
  ['/admin/profil', User, 'Profil'],
]

function SidebarContent({ onNavigate }) {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  const signOut = () => {
    logout()
    navigate('/admin/connexion')
  }

  return (
    <>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-display text-lg font-bold text-white">
          M
        </div>
        <div>
          <p className="font-display text-xl text-white">Milfleurs</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Administration</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Navigation</p>
        <nav className="grid gap-1">
          {nav.map(([to, Icon, label]) => (
            <NavLink
              end={to === '/admin'}
              key={to}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-white/15 font-semibold text-white shadow-xs'
                  : 'text-white/65 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 group-hover:bg-white/10">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-30" />
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-white/10">
        <div className="mb-3">
          <InstallAppButton label="Installer Milfleurs Admin" />
        </div>
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/20 text-xs font-bold text-gold">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">Milfleurs Admin</p>
            <p className="truncate text-[10px] text-white/45">Gestionnaire</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const current = nav.find(([to]) => to === pathname)?.[2] || 'Administration'

  return (
    <div className="admin-shell min-h-screen bg-[#F7F5F2] text-ink dark:bg-[#151214]">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col overflow-y-auto bg-ink lg:flex dark:bg-[#110E10]">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
          />
          <aside className="relative flex h-full w-[270px] flex-col overflow-y-auto bg-ink shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="min-h-screen lg:pl-[260px]">
        <header className="admin-topbar sticky top-0 z-30 flex h-20 items-center justify-between border-b border-stone-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8 dark:border-white/10 dark:bg-plum/95">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl bg-stone-100 text-stone-700 lg:hidden dark:bg-white/10 dark:text-white"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Milfleurs E-Shop</p>
              <h1 className="font-display text-xl font-semibold sm:text-2xl text-ink dark:text-white">{current}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="flex h-10 items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 text-xs font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Voir la boutique"
            >
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Voir la boutique</span>
            </Link>

            <button
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-ink dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gold" />
            </button>
          </div>
        </header>

        <main className="admin-content p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
