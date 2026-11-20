import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, Shapes, ShoppingCart, Images, Quote,
  FileText, Settings, User, LogOut, Bell, Menu, X, ChevronRight, Store,
  Moon, Sun, Plus, ExternalLink,
} from 'lucide-react'
import { useAdminAuth } from '../contexts/AdminAuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { orders } from '../data/orders'
import { products } from '../data/products'
import InstallAppButton from '../components/common/InstallAppButton'
import { formatCurrency } from '../utils/formatCurrency'

const nav = [
  ['/admin', LayoutDashboard, 'Tableau de bord', null],
  ['/admin/produits', Package, 'Produits', products.length],
  ['/admin/categories', Shapes, 'Catégories', null],
  ['/admin/commandes', ShoppingCart, 'Commandes', orders.filter(o => o.status !== 'Livrée').length],
  ['/admin/galerie', Images, 'Galerie', null],
  ['/admin/temoignages', Quote, 'Témoignages', null],
  ['/admin/contenus', FileText, 'Contenus', null],
  ['/admin/parametres', Settings, 'Paramètres', null],
  ['/admin/profil', User, 'Profil', null],
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
      {/* Brand Header - Clean & Elegant */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-display text-lg font-bold text-white">
            M
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-white">Milfleurs</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Administration</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="px-4 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Navigation</p>
        <nav className="space-y-1">
          {nav.map(([to, Icon, label, badge]) => (
            <NavLink
              end={to === '/admin'}
              key={to}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) => `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                isActive
                  ? 'bg-white/15 font-semibold text-white shadow-xs'
                  : 'text-white/65 hover:bg-white/8 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 group-hover:bg-white/10 text-white/80 group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{label}</span>
              </div>
              {badge !== null ? (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80">
                  {badge}
                </span>
              ) : (
                <ChevronRight className="h-3.5 w-3.5 opacity-30 group-hover:opacity-60" />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Direct Link to Store */}
      <div className="px-4 pb-4">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-gold" />
            <span>Voir la boutique</span>
          </div>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="mt-auto p-4 border-t border-white/10 space-y-3">
        <InstallAppButton label="Installer l'application" />

        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">Administratrice</p>
            <p className="truncate text-[10px] text-white/45">admin@milfleur.shop</p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs text-white/55 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </>
  )
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
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
        {/* Topbar */}
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
              to="/admin/produits/nouveau"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-black dark:bg-white dark:text-ink dark:hover:bg-stone-200"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Nouveau produit</span>
            </Link>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-50 hover:text-ink dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              aria-label="Changer le thème"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-stone-600 hover:text-ink dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-gold" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-stone-200 bg-white p-4 shadow-elevated dark:border-white/15 dark:bg-[#201A1D]">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink dark:text-white">Commandes récentes</p>
                    <span className="text-[10px] text-stone-400 font-semibold">3 dernières</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {orders.slice(0, 3).map(o => (
                      <div key={o.id} className="flex items-start gap-3 text-xs">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white">
                          <ShoppingCart className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-ink dark:text-white">Commande #{o.id}</p>
                          <p className="text-[11px] text-stone-500">{o.customer} ({o.city}) • {formatCurrency(o.amount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/admin/commandes"
                    onClick={() => setNotificationsOpen(false)}
                    className="mt-3 block text-center text-xs font-semibold text-gold hover:underline pt-2 border-t border-stone-100 dark:border-white/10"
                  >
                    Voir toutes les commandes →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="admin-content p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
