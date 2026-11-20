import { useState, useMemo } from 'react'
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom'
import {
  Eye, EyeOff, Plus, Search, MoreHorizontal, ArrowUpRight, Package, ShoppingBag,
  Clock, Banknote, TrendingUp, CheckCircle, AlertCircle, MessageCircle, ArrowRight,
  Filter, Layers, Sparkles, ExternalLink, RefreshCw
} from 'lucide-react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { products } from '../../data/products'
import { orders } from '../../data/orders'
import { categories } from '../../data/categories'
import { gallery } from '../../data/gallery'
import { testimonials } from '../../data/testimonials'
import { formatCurrency } from '../../utils/formatCurrency'
import Button from '../../components/common/Button'
import SEO from '../../components/common/SEO'
import { siteConfig } from '../../config/siteConfig'

export function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAdminAuth()
  return isAuthenticated ? children : <Navigate to="/admin/connexion" replace />
}

export function LoginPage() {
  const [show, setShow] = useState(false)
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const submit = e => {
    e.preventDefault()
    login()
    navigate('/admin')
  }

  return (
    <>
      <SEO title="Connexion administration | Milfleurs" />
      <div className="grid min-h-screen place-items-center bg-mist px-4 py-12 dark:bg-[#151214]">
        <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-card dark:border-white/10 dark:bg-[#201A1D]">
          <div className="text-center">
            <Link to="/" className="inline-block font-display text-3xl tracking-tight text-ink dark:text-white">
              Mil<span className="italic text-gold">fleurs</span>
            </Link>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">Espace Administration</p>
            <p className="mt-1 text-xs text-stone-500">Connexion sécurisée</p>
          </div>

          <label className="mt-8 block text-xs font-semibold text-stone-700 dark:text-white">
            Adresse E-mail
            <input
              type="email"
              required
              defaultValue="admin@milfleur.shop"
              className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
            />
          </label>

          <label className="mt-4 block text-xs font-semibold text-stone-700 dark:text-white">
            Mot de passe
            <div className="relative mt-1.5">
              <input
                type={show ? 'text' : 'password'}
                required
                defaultValue="milfleur-shop"
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="my-5 flex items-center justify-between text-xs text-stone-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded border-stone-300 text-gold focus:ring-gold" />
              Se souvenir de moi
            </label>
            <span className="text-gold">Accès démo pré-rempli</span>
          </div>

          <Button type="submit" variant="dark" className="w-full">
            Se connecter
          </Button>

          <Link to="/" className="mt-6 block text-center text-xs text-stone-500 hover:text-ink dark:text-white/60 dark:hover:text-white">
            ← Retour à la boutique
          </Link>
        </form>
      </div>
    </>
  )
}

const Title = ({ children, action, subtitle }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Gestion de la boutique</p>
      <h1 className="mt-1 font-display text-2xl font-normal sm:text-3xl text-ink dark:text-white">{children}</h1>
      {subtitle && <p className="mt-1 text-xs text-stone-500 dark:text-white/60">{subtitle}</p>}
    </div>
    {action}
  </div>
)

const Status = ({ children }) => {
  const isDelivered = children === 'Livrée' || children === 'Disponible'
  const isPending = children === 'En attente' || children === 'Nouvelle'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
      isDelivered
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
        : isPending
        ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
        : 'bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        isDelivered ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-stone-400'
      }`} />
      {children}
    </span>
  )
}

// =========================================================================
// MODERN COOL DASHBOARD
// =========================================================================
export function DashboardPage() {
  const [chartMetric, setChartMetric] = useState('revenue')
  const [orderFilter, setOrderFilter] = useState('all')

  const chartData = [
    { month: 'Mai', revenue: 650000, orders: 18, height: 45 },
    { month: 'Juin', revenue: 820000, orders: 24, height: 58 },
    { month: 'Juil', revenue: 610000, orders: 16, height: 42 },
    { month: 'Août', revenue: 1050000, orders: 29, height: 75 },
    { month: 'Sept', revenue: 920000, orders: 25, height: 65 },
    { month: 'Oct', revenue: 1350000, orders: 36, height: 92 },
    { month: 'Nov', revenue: 1450000, orders: 38, height: 100 },
  ]

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'pending') return orders.filter(o => o.status !== 'Livrée')
    if (orderFilter === 'completed') return orders.filter(o => o.status === 'Livrée')
    return orders
  }, [orderFilter])

  return (
    <>
      {/* Welcome Banner */}
      <div className="mb-8 rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Boutique en ligne en activité</p>
            </div>
            <h1 className="mt-2 font-display text-2xl font-normal sm:text-3xl text-ink dark:text-white">
              Bonjour, Administratrice Milfleurs 👋
            </h1>
            <p className="mt-1 text-xs text-stone-500 dark:text-white/60">
              Votre activité est en hausse de <b className="text-emerald-600 dark:text-emerald-400">+18.4%</b> ce mois-ci • 7 commandes en attente d’expédition sur WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/admin/produits/nouveau"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-black dark:bg-white dark:text-ink"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Ajouter un produit</span>
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-xs transition hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Pro</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Banknote,
            label: 'Chiffre d’affaires estimé',
            value: '1 450 000 FCFA',
            trend: '+18.4%',
            positive: true,
            note: 'vs mois précédent',
          },
          {
            icon: ShoppingBag,
            label: 'Commandes totales',
            value: '38 commandes',
            trend: '+12%',
            positive: true,
            note: '31 confirmées, 7 en attente',
          },
          {
            icon: Package,
            label: 'Références en ligne',
            value: `${products.length} produits`,
            trend: '+3',
            positive: true,
            note: '100% en stock disponible',
          },
          {
            icon: TrendingUp,
            label: 'Panier moyen',
            value: '38 150 FCFA',
            trend: '+5.8%',
            positive: true,
            note: 'Excellente conversion',
          },
        ].map(kpi => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs transition hover:border-stone-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-gold dark:bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  kpi.positive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-700'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  {kpi.trend}
                </span>
              </div>
              <p className="mt-4 text-xs text-stone-500 dark:text-white/60">{kpi.label}</p>
              <b className="mt-1 block font-display text-2xl text-ink dark:text-white">{kpi.value}</b>
              <p className="mt-1 text-[11px] text-stone-400">{kpi.note}</p>
            </div>
          )
        })}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        
        {/* Dynamic Interactive Revenue Chart */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-4 dark:border-white/10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Performances commerciales</p>
              <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">
                Progression des ventes (7 derniers mois)
              </h2>
            </div>
            
            {/* Metric Switcher */}
            <div className="flex items-center rounded-xl bg-stone-100 p-1 dark:bg-white/10">
              <button
                onClick={() => setChartMetric('revenue')}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  chartMetric === 'revenue'
                    ? 'bg-white text-ink shadow-xs dark:bg-stone-800 dark:text-white'
                    : 'text-stone-500 hover:text-ink dark:text-white/60'
                }`}
              >
                Chiffre d’affaires
              </button>
              <button
                onClick={() => setChartMetric('orders')}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  chartMetric === 'orders'
                    ? 'bg-white text-ink shadow-xs dark:bg-stone-800 dark:text-white'
                    : 'text-stone-500 hover:text-ink dark:text-white/60'
                }`}
              >
                Commandes
              </button>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5 pt-6">
            {chartData.map((d, i) => {
              const value = chartMetric === 'revenue' ? `${Math.round(d.revenue / 1000)}k` : d.orders
              const barHeight = chartMetric === 'revenue' ? d.height : Math.round((d.orders / 38) * 100)
              const isCurrent = i === chartData.length - 1

              return (
                <div key={d.month} className="group relative flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition absolute -top-8 bg-ink text-white text-[10px] py-1 px-2 rounded-md shadow-md whitespace-nowrap pointer-events-none z-10 dark:bg-white dark:text-ink">
                    {chartMetric === 'revenue' ? formatCurrency(d.revenue) : `${d.orders} commandes`}
                  </div>

                  <span className="text-[10px] font-semibold text-stone-400 group-hover:text-gold transition">
                    {value}
                  </span>

                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gold hover:brightness-110 shadow-xs'
                        : 'bg-ink/80 hover:bg-gold dark:bg-white/70 dark:hover:bg-gold'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                  
                  <span className={`text-[11px] font-semibold ${isCurrent ? 'text-gold' : 'text-stone-500 dark:text-white/60'}`}>
                    {d.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-white/10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Répartition</p>
                <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">Par univers</h2>
              </div>
              <span className="text-xs font-semibold text-stone-400">Part de ventes</span>
            </div>

            <div className="mt-5 space-y-4">
              {[
                { name: 'Soins du visage', pct: 36, count: 3 },
                { name: 'Sérums ciblés', pct: 24, count: 2 },
                { name: 'Beauté coréenne (K-Beauty)', pct: 20, count: 2 },
                { name: 'Vitamines & Compléments', pct: 20, count: 3 },
              ].map(cat => (
                <div key={cat.name}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-medium text-stone-700 dark:text-white/80">{cat.name}</span>
                    <span className="font-bold text-ink dark:text-white">{cat.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gold transition-all duration-500"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-stone-200/80 bg-mist/50 p-3.5 text-xs text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            <span className="font-semibold text-ink dark:text-white">Conseil de gestion :</span> Le stock de sérums vitamine C et acide azélaïque est très demandé. Pensez au réassort.
          </div>
        </div>
      </div>

      {/* Top Best-Seller Products Widget */}
      <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-white/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Catalogue phare</p>
            <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">
              Produits les plus vendus
            </h2>
          </div>
          <Link to="/admin/produits" className="text-xs font-semibold text-gold hover:underline">
            Gérer tout le catalogue ({products.length}) →
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map(p => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-xl border border-stone-100 bg-[#FBF9F7] p-3 transition hover:border-stone-300 dark:border-white/5 dark:bg-white/5"
            >
              <img src={p.images[0]} alt="" className="h-12 w-12 rounded-lg object-contain bg-white dark:bg-white/5" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink dark:text-white">{p.name}</p>
                <p className="text-[11px] text-stone-400">{p.category}</p>
                <p className="text-xs font-bold text-gold">{formatCurrency(p.price)}</p>
              </div>
              <Link
                to={`/admin/produits/${p.id}/modifier`}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white text-stone-600 hover:text-ink shadow-xs dark:bg-white/10 dark:text-white"
                title="Modifier"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders with Quick Actions */}
      <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-100 pb-4 dark:border-white/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Dernières transactions</p>
            <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">
              Commandes récentes
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-xl bg-stone-100 p-1 dark:bg-white/10">
            <button
              onClick={() => setOrderFilter('all')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                orderFilter === 'all'
                  ? 'bg-white text-ink shadow-xs dark:bg-stone-800 dark:text-white'
                  : 'text-stone-500 hover:text-ink dark:text-white/60'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setOrderFilter('pending')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                orderFilter === 'pending'
                  ? 'bg-white text-ink shadow-xs dark:bg-stone-800 dark:text-white'
                  : 'text-stone-500 hover:text-ink dark:text-white/60'
              }`}
            >
              À traiter (7)
            </button>
            <button
              onClick={() => setOrderFilter('completed')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                orderFilter === 'completed'
                  ? 'bg-white text-ink shadow-xs dark:bg-stone-800 dark:text-white'
                  : 'text-stone-500 hover:text-ink dark:text-white/60'
              }`}
            >
              Livrées (31)
            </button>
          </div>
        </div>

        {/* Interactive Orders Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="border-b border-stone-200 text-stone-400 dark:border-white/10">
              <tr>
                <th className="pb-3 font-semibold">Référence</th>
                <th className="pb-3 font-semibold">Cliente</th>
                <th className="pb-3 font-semibold">Destination</th>
                <th className="pb-3 font-semibold">Montant</th>
                <th className="pb-3 font-semibold">Statut</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-white/5">
              {filteredOrders.map(o => {
                const initials = o.customer.split(' ').map(n => n[0]).join('').slice(0, 2)
                return (
                  <tr key={o.id} className="hover:bg-stone-50/60 dark:hover:bg-white/5 transition">
                    <td className="py-3.5 font-semibold text-ink dark:text-white">
                      #{o.id}
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-stone-100 font-bold text-[10px] text-stone-600 dark:bg-white/10 dark:text-white">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-ink dark:text-white">{o.customer}</p>
                          <p className="text-[10px] text-stone-400">{o.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-medium text-stone-700 dark:text-white/80">{o.city}</span>
                    </td>
                    <td className="font-bold text-ink dark:text-white">
                      {formatCurrency(o.amount)}
                    </td>
                    <td>
                      <Status>{o.status}</Status>
                    </td>
                    <td className="text-stone-400">
                      {o.date}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${o.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Bonjour ${o.customer}, concernant votre commande #${o.id} sur Milfleurs...`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400"
                          title="Contacter sur WhatsApp"
                        >
                          <MessageCircle className="h-3 w-3" />
                          <span>WhatsApp</span>
                        </a>

                        <Link
                          to={`/admin/commandes/${o.id}`}
                          className="grid h-7 w-7 place-items-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-ink shadow-xs dark:border-white/10 dark:bg-white/5 dark:text-white"
                          title="Détails"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export function ProductsAdmin() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return products.filter(p =>
      !search || `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <>
      <Title
        subtitle="Consultez, modifiez et gérez les stocks de votre catalogue en ligne."
        action={
          <Button to="/admin/produits/nouveau" variant="dark">
            <Plus className="h-4 w-4" /> Ajouter un produit
          </Button>
        }
      >
        Catalogue Produits ({products.length})
      </Title>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full sm:w-80 items-center gap-2.5 rounded-full border border-stone-200 bg-mist px-4 py-2 text-xs dark:border-white/10 dark:bg-white/5">
            <Search className="h-3.5 w-3.5 text-stone-400" />
            <input
              placeholder="Rechercher par nom, univers..."
              className="w-full bg-transparent outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span><b>{filtered.length}</b> références trouvées</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-xs">
            <thead className="border-b border-stone-200 text-stone-400 dark:border-white/10">
              <tr>
                <th className="pb-3 font-semibold">Visuel</th>
                <th className="pb-3 font-semibold">Nom du produit</th>
                <th className="pb-3 font-semibold">Univers</th>
                <th className="pb-3 font-semibold">Prix</th>
                <th className="pb-3 font-semibold">Statut</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5">
                  <td className="py-2.5">
                    <img src={p.images[0]} alt="" className="h-11 w-11 rounded-xl object-contain bg-stone-50 p-1 dark:bg-white/5" />
                  </td>
                  <td className="font-semibold text-ink dark:text-white">
                    <Link to={`/admin/produits/${p.id}/modifier`} className="hover:text-gold transition">
                      {p.name}
                    </Link>
                  </td>
                  <td>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold text-stone-700 dark:bg-white/10 dark:text-white">
                      {p.category}
                    </span>
                  </td>
                  <td className="font-bold text-ink dark:text-white">
                    {formatCurrency(p.price)}
                  </td>
                  <td>
                    <Status>{p.stockStatus}</Status>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/collections/${p.slug}`}
                        target="_blank"
                        className="rounded-lg border border-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:text-ink dark:border-white/10 dark:text-white"
                      >
                        Voir en ligne
                      </Link>
                      <Link
                        to={`/admin/produits/${p.id}/modifier`}
                        className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white hover:bg-black transition dark:bg-white dark:text-ink"
                        title="Modifier"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export function ProductFormPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  return (
    <>
      <Title subtitle="Remplissez les informations pour publier ou actualiser ce soin.">
        {product ? `Modifier : ${product.name}` : 'Nouvelle référence au catalogue'}
      </Title>

      <form onSubmit={e => e.preventDefault()} className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-4 dark:border-white/10 dark:bg-white/5">
          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Nom du produit *
            <input
              defaultValue={product?.name}
              placeholder="Ex: Sérum Acide Hyaluronique Pur"
              className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-white">
              Univers / Catégorie *
              <select
                defaultValue={product?.categorySlug}
                className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold dark:bg-white/5"
              >
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </label>

            <label className="block text-xs font-semibold text-stone-700 dark:text-white">
              Prix de vente (FCFA) *
              <input
                type="number"
                defaultValue={product?.price}
                placeholder="12500"
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Description courte
            <textarea
              rows="2"
              defaultValue={product?.shortDescription}
              placeholder="Résumé pour les cartes de produits..."
              className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </label>

          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Description détaillée & conseils d’application
            <textarea
              rows="6"
              defaultValue={product?.description}
              placeholder="Bienfaits, conseils d'utilisation, provenance..."
              className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </label>

          <div className="pt-2">
            <Button variant="dark">Enregistrer les modifications</Button>
          </div>
        </div>

        {/* Media & Meta sidebar */}
        <aside className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs h-fit space-y-5 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-base font-semibold text-ink dark:text-white">Visuel de présentation</h2>
          
          <div className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-stone-200 bg-[#FBF9F7] p-4 text-center text-xs text-stone-400 dark:border-white/10 dark:bg-white/5">
            {product ? (
              <img src={product.images[0]} className="h-full w-full object-contain" alt="" />
            ) : (
              <div>
                <Package className="mx-auto h-8 w-8 text-stone-300" />
                <p className="mt-2 font-medium">Déposer une photo ici</p>
                <p className="text-[10px] text-stone-400">PNG, JPG jusqu’à 5 Mo</p>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-stone-300 text-gold focus:ring-gold" />
              <span className="font-medium text-stone-700 dark:text-white">Produit actif en stock</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked={product?.featured} className="rounded border-stone-300 text-gold focus:ring-gold" />
              <span className="font-medium text-stone-700 dark:text-white">Mettre en avant sur l’accueil</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked={product?.newProduct} className="rounded border-stone-300 text-gold focus:ring-gold" />
              <span className="font-medium text-stone-700 dark:text-white">Marquer comme Nouveau</span>
            </label>
          </div>
        </aside>
      </form>
    </>
  )
}

export function OrdersAdmin() {
  return (
    <>
      <Title subtitle="Gérez le suivi des commandes WhatsApp et l’expédition des colis.">
        Commandes ({orders.length})
      </Title>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="border-b border-stone-200 text-stone-400 dark:border-white/10">
              <tr>
                {['Réf', 'Cliente', 'Téléphone', 'Ville', 'Montant', 'Statut', 'Date', 'Action'].map(x => (
                  <th key={x} className="pb-3 font-semibold">{x}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5">
                  <td className="py-3.5 font-bold">#{o.id}</td>
                  <td className="font-semibold">{o.customer}</td>
                  <td>{o.phone}</td>
                  <td>{o.city}</td>
                  <td className="font-bold text-ink dark:text-white">{formatCurrency(o.amount)}</td>
                  <td><Status>{o.status}</Status></td>
                  <td className="text-stone-400">{o.date}</td>
                  <td>
                    <Link to={`/admin/commandes/${o.id}`} className="text-gold font-semibold hover:underline">
                      Voir détail →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export function OrderDetail() {
  const { id } = useParams()
  const order = orders.find(o => o.id === id)

  return (
    <>
      <Title subtitle={`Enregistrée le ${order?.date || 'récemment'}`}>
        Détail de la commande #{id}
      </Title>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs lg:col-span-2 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">Articles commandés</h2>
          
          <div className="mt-4 divide-y divide-stone-100 border-y border-stone-100 py-2 dark:divide-white/5 dark:border-white/10">
            <div className="flex items-center justify-between py-3">
              <div>
                <b className="text-sm font-semibold text-ink dark:text-white">Crème visage éclat</b>
                <p className="text-xs text-stone-400">Quantité : 1 • Format standard</p>
              </div>
              <span className="font-bold text-ink dark:text-white">{formatCurrency(order?.amount || 12500)}</span>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs dark:border-white/10">
            <div className="flex justify-between text-stone-500">
              <span>Sous-total</span>
              <span>{formatCurrency((order?.amount || 15000) - 2500)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Livraison estimée</span>
              <span>{formatCurrency(2500)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink pt-2 dark:text-white">
              <span>Total</span>
              <span>{formatCurrency(order?.amount || 0)}</span>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs h-fit space-y-4 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-base font-semibold text-ink dark:text-white">Informations cliente</h2>
          <div className="text-xs space-y-1.5 border-b border-stone-100 pb-4 dark:border-white/10">
            <p className="font-bold text-sm text-ink dark:text-white">{order?.customer}</p>
            <p className="text-stone-500">Téléphone : {order?.phone}</p>
            <p className="text-stone-500">Ville / Quartier : {order?.city}</p>
            <div className="pt-1">
              <Status>{order?.status || 'En attente'}</Status>
            </div>
          </div>

          <a
            href={`https://wa.me/${order?.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Bonjour ${order?.customer}, nous préparons votre commande #${id} sur Milfleurs.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1FB357] py-3 text-xs font-semibold text-white transition hover:bg-[#1a9d4c]"
          >
            <MessageCircle className="h-4 w-4" />
            Échanger sur WhatsApp
          </a>
        </aside>
      </div>
    </>
  )
}

export function SimpleAdminPage({ title, type }) {
  const data = type === 'gallery' ? gallery : type === 'testimonials' ? testimonials : categories

  return (
    <>
      <Title
        subtitle="Gérez facilement les contenus affichés sur la boutique."
        action={
          <Button variant="dark">
            <Plus className="h-4 w-4" /> Ajouter un élément
          </Button>
        }
      >
        {title} ({data.length})
      </Title>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((x, i) => (
          <div key={x.id || x.slug || x.name} className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-white/5">
            {x.image && <img src={x.image} alt="" className="mb-3 h-36 w-full rounded-xl object-cover" />}
            <b className="text-sm font-semibold text-ink dark:text-white">{x.title || x.name || `Élément ${i + 1}`}</b>
            <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-white/60">{x.text || x.category || 'Contenu administrable'}</p>
          </div>
        ))}
      </div>
    </>
  )
}
