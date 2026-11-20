import { useState } from 'react'
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, Plus, Search, MoreHorizontal, ArrowUpRight, Package, ShoppingBag, Clock, Banknote } from 'lucide-react'
import { useAdminAuth } from '../../contexts/AdminAuthContext'
import { products } from '../../data/products'
import { orders } from '../../data/orders'
import { categories } from '../../data/categories'
import { gallery } from '../../data/gallery'
import { testimonials } from '../../data/testimonials'
import { formatCurrency } from '../../utils/formatCurrency'
import Button from '../../components/common/Button'
import SEO from '../../components/common/SEO'

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

const Title = ({ children, action }) => (
  <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Gestion de la boutique</p>
      <h1 className="mt-1 font-display text-2xl font-normal sm:text-3xl text-ink dark:text-white">{children}</h1>
    </div>
    {action}
  </div>
)

const Status = ({ children }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
    children === 'Livrée' || children === 'Disponible'
      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
      : children === 'Nouvelle'
      ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
      : 'bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white'
  }`}>
    {children}
  </span>
)

export function DashboardPage() {
  return (
    <>
      <Title>Tableau de bord</Title>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [Package, 'Produits actifs', '12', '+2 ajoutés ce mois'],
          [ShoppingBag, 'Commandes reçues', '38', '+15% vs mois dernier'],
          [Clock, 'En attente', '7', 'À traiter sur WhatsApp'],
          [Banknote, 'Volume estimé', '1,45 M FCFA', 'Performances solides'],
        ].map(([Icon, label, value, note]) => (
          <div key={label} className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-mist text-gold dark:bg-white/10">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-semibold text-stone-400">Activité</span>
            </div>
            <p className="mt-4 text-xs text-stone-500 dark:text-white/60">{label}</p>
            <b className="mt-1 block font-display text-2xl text-ink dark:text-white">{value}</b>
            <p className="mt-1 text-[11px] text-stone-400">{note}</p>
          </div>
        ))}
      </div>

      {/* Charts & Stats */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Activité</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">Évolution des commandes</h2>
            </div>
            <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-semibold text-stone-600 dark:bg-white/10 dark:text-white">
              7 derniers mois
            </span>
          </div>

          <div className="mt-8 flex h-48 items-end gap-3 sm:gap-4">
            {[45, 58, 40, 72, 65, 92, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-ink hover:bg-gold transition-colors duration-200 dark:bg-white dark:hover:bg-gold"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-stone-400">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Catalogue</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">Répartition par univers</h2>
          <div className="mt-6 space-y-4">
            {categories.slice(0, 5).map((c, i) => (
              <div key={c.slug}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-stone-600 dark:text-white/70">{c.name}</span>
                  <b className="font-semibold text-ink dark:text-white">{28 - i * 3}%</b>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${28 - i * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-white/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Commandes récentes</p>
            <h2 className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-white">Dernières demandes</h2>
          </div>
          <Link to="/admin/commandes" className="text-xs font-semibold text-gold hover:underline">
            Voir tout
          </Link>
        </div>
        <OrderTable />
      </div>
    </>
  )
}

function OrderTable() {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-xs">
        <thead className="border-b border-stone-200 text-stone-400 dark:border-white/10">
          <tr>
            {['Référence', 'Cliente', 'Ville', 'Montant', 'Statut', 'Date', ''].map(x => (
              <th key={x} className="pb-3 font-semibold">{x}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-white/5">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5">
              <td className="py-3.5 font-semibold text-ink dark:text-white">{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.city}</td>
              <td className="font-semibold">{formatCurrency(o.amount)}</td>
              <td><Status>{o.status}</Status></td>
              <td className="text-stone-400">{o.date}</td>
              <td>
                <Link to={`/admin/commandes/${o.id}`} className="text-stone-400 hover:text-ink dark:hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ProductsAdmin() {
  return (
    <>
      <Title action={<Button to="/admin/produits/nouveau" variant="dark"><Plus className="h-4 w-4" />Ajouter un produit</Button>}>
        Catalogue Produits
      </Title>
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-mist px-4 py-2 text-xs dark:border-white/10 dark:bg-white/5">
          <Search className="h-3.5 w-3.5 text-stone-400" />
          <input placeholder="Filtrer les produits..." className="bg-transparent outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-xs">
            <thead className="border-b border-stone-200 text-stone-400 dark:border-white/10">
              <tr>
                {['Visuel', 'Nom du produit', 'Univers', 'Prix', 'Statut', ''].map(x => (
                  <th key={x} className="pb-3 font-semibold">{x}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-white/5">
                  <td className="py-2.5">
                    <img src={p.images[0]} alt="" className="h-10 w-10 rounded-lg object-contain bg-stone-50 dark:bg-white/5" />
                  </td>
                  <td className="font-semibold text-ink dark:text-white">{p.name}</td>
                  <td>{p.category}</td>
                  <td className="font-semibold">{formatCurrency(p.price)}</td>
                  <td><Status>{p.stockStatus}</Status></td>
                  <td>
                    <Link to={`/admin/produits/${p.id}/modifier`} className="text-stone-400 hover:text-ink dark:hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
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

export function ProductFormPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))

  return (
    <>
      <Title>{product ? 'Modifier la référence' : 'Nouvelle référence'}</Title>
      <form onSubmit={e => e.preventDefault()} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-4 dark:border-white/10 dark:bg-white/5">
          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Nom du produit
            <input defaultValue={product?.name} className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-stone-700 dark:text-white">
              Catégorie / Univers
              <select defaultValue={product?.categorySlug} className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold dark:bg-white/5">
                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </label>
            <label className="block text-xs font-semibold text-stone-700 dark:text-white">
              Prix (FCFA)
              <input type="number" defaultValue={product?.price} className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold" />
            </label>
          </div>
          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Description courte
            <textarea rows="2" defaultValue={product?.shortDescription} className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold" />
          </label>
          <label className="block text-xs font-semibold text-stone-700 dark:text-white">
            Description détaillée & conseils
            <textarea rows="5" defaultValue={product?.description} className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-gold" />
          </label>
          <Button variant="dark">Enregistrer les modifications</Button>
        </div>

        <aside className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs h-fit space-y-4 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-base font-semibold text-ink dark:text-white">Visuel du produit</h2>
          <div className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-stone-200 bg-mist p-3 text-center text-xs text-stone-400 dark:border-white/10 dark:bg-white/5">
            {product ? <img src={product.images[0]} className="h-full w-full object-contain" alt="" /> : 'Glissez une image ici'}
          </div>
          <div className="space-y-2 text-xs">
            {['Produit en stock', 'Mettre en avant sur l’accueil', 'Marquer comme Nouveau'].map(x => (
              <label key={x} className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded border-stone-300 text-gold focus:ring-gold" />
                <span>{x}</span>
              </label>
            ))}
          </div>
        </aside>
      </form>
    </>
  )
}

export function OrdersAdmin() {
  return (
    <>
      <Title>Gestion des commandes</Title>
      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
        <OrderTable />
      </div>
    </>
  )
}

export function OrderDetail() {
  const { id } = useParams()
  const order = orders.find(o => o.id === id)

  return (
    <>
      <Title>Détail Commande {id}</Title>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs lg:col-span-2 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">Articles commandés</h2>
          <div className="mt-4 border-y border-stone-100 py-4 text-xs dark:border-white/10">
            <b className="text-sm">Crème visage éclat</b>
            <p className="text-stone-400">Quantité : 1 • Format standard</p>
          </div>
          <div className="mt-4 flex justify-between text-base font-bold text-ink dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(order?.amount || 0)}</span>
          </div>
        </div>

        <aside className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs h-fit space-y-3 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-base font-semibold text-ink dark:text-white">Informations cliente</h2>
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm text-ink dark:text-white">{order?.customer}</p>
            <p className="text-stone-500">{order?.phone}</p>
            <p className="text-stone-500">{order?.city}</p>
          </div>
          <Status>{order?.status}</Status>
          <Button variant="whatsapp" className="w-full mt-4">
            Contacter sur WhatsApp
          </Button>
        </aside>
      </div>
    </>
  )
}

export function SimpleAdminPage({ title, type }) {
  const data = type === 'gallery' ? gallery : type === 'testimonials' ? testimonials : categories
  return (
    <>
      <Title action={<Button variant="dark"><Plus className="h-4 w-4" />Ajouter</Button>}>
        {title}
      </Title>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map((x, i) => (
          <div key={x.id || x.slug || x.name} className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-white/5">
            {x.image && <img src={x.image} alt="" className="mb-3 h-32 w-full rounded-xl object-cover" />}
            <b className="text-sm text-ink dark:text-white">{x.title || x.name || `Élément ${i + 1}`}</b>
            <p className="mt-1 line-clamp-2 text-xs text-stone-500 dark:text-white/60">{x.text || x.category || 'Contenu administrable'}</p>
          </div>
        ))}
      </div>
    </>
  )
}
