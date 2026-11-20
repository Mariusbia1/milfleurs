import { Menu, Search, ShoppingBag, X, Moon, Sun, ArrowRight, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useTheme } from '../../contexts/ThemeContext'

const links = [
  ['/', 'Accueil'],
  ['/collections', 'Boutique'],
  ['/galerie', 'Nos univers'],
  ['/a-propos', 'Notre histoire'],
  ['/contact', 'Contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Top Announcement Bar - Reassurance & Elegance */}
      <div className="bg-ink text-[11px] font-medium tracking-wider text-ivory/90 dark:bg-[#100D0F]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-2 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            <span>Produits 100% certifiés authentiques & importés</span>
          </div>
          <p className="mx-auto text-center sm:mx-0">
            Livraison rapide à Cotonou & expédition internationale
          </p>
          <div className="hidden items-center gap-4 text-xs font-semibold sm:flex">
            <Link to="/contact" className="transition hover:text-gold">Conseils personnalisés</Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-ivory/95 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-plum/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-baseline gap-1 font-display text-2xl tracking-tight sm:text-3xl">
            <span className="font-semibold text-ink dark:text-white">Mil</span>
            <span className="italic font-normal text-gold transition group-hover:opacity-85">fleurs</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-ink/80 hover:text-gold dark:text-white/80 dark:hover:text-gold'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/collections"
              aria-label="Rechercher dans la collection"
              className="grid h-10 w-10 place-items-center rounded-full text-ink/75 transition hover:bg-mist hover:text-ink dark:text-white/75 dark:hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </Link>

            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-full text-ink/75 transition hover:bg-mist hover:text-ink dark:text-white/75 dark:hover:bg-white/10"
              aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <Link
              to="/panier"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-mist hover:text-ink dark:text-white/80 dark:hover:bg-white/10"
              aria-label={`Panier, ${itemCount} articles`}
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] font-bold text-white dark:bg-gold">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-mist lg:hidden dark:text-white dark:hover:bg-white/10"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory p-6 dark:bg-plum lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-5 dark:border-white/10">
            <Link to="/" onClick={() => setOpen(false)} className="font-display text-2xl tracking-tight">
              Mil<span className="italic text-gold">fleurs</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full bg-mist text-ink dark:bg-white/10 dark:text-white"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Beauté & Bien-être d’exception
            </p>
          </div>

          <nav className="grid gap-4">
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between border-b border-stone-100 py-3 font-display text-2xl transition dark:border-white/5 ${
                    isActive ? 'text-gold' : 'text-ink dark:text-white'
                  }`
                }
              >
                <span>{label}</span>
                <ArrowRight className="h-4 w-4 text-stone-400" />
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-stone-200 pt-6 dark:border-white/10">
            <Link
              to="/collections"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-ink py-3.5 text-sm font-semibold text-white dark:bg-white dark:text-ink"
            >
              Découvrir la boutique
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
