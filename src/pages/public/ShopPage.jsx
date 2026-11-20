import { useMemo, useState } from 'react'
import { Search, ShieldCheck, Filter, X, Check, MessageCircle, ArrowRight } from 'lucide-react'
import SEO from '../../components/common/SEO'
import ProductCard from '../../components/products/ProductCard'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { siteConfig } from '../../config/siteConfig'

export default function ShopPage({ categorySlug }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categorySlug || 'tous')
  const [sort, setSort] = useState('nouveautes')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts = { tous: products.length }
    categories.forEach(c => {
      counts[c.slug] = products.filter(p => p.categorySlug === c.slug).length
    })
    return counts
  }, [])

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const result = products.filter(p =>
      (category === 'tous' || p.categorySlug === category) &&
      (!normalizedQuery || `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase().includes(normalizedQuery))
    )
    if (sort === 'prix-asc') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'prix-desc') return [...result].sort((a, b) => b.price - a.price)
    if (sort === 'alpha') return [...result].sort((a, b) => a.name.localeCompare(b.name))
    return [...result].sort((a, b) => Number(b.newProduct) - Number(a.newProduct))
  }, [query, category, sort])

  const currentCategoryObj = useMemo(() => {
    return categories.find(c => c.slug === category)
  }, [category])

  return (
    <>
      <SEO title="Boutique beauté & bien-être | Milfleurs" />

      {/* Header Banner */}
      <section className="border-b border-stone-200/80 bg-mist/50 px-4 py-12 sm:px-6 md:py-16 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Boutique en ligne
          </p>
          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-3xl font-normal sm:text-4xl md:text-5xl text-ink dark:text-white">
                {currentCategoryObj ? currentCategoryObj.name : 'Toutes nos collections'}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-white/70">
                Cosmétiques de prestige, routines K-Beauty et compléments nutritionnels authentiques.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold">
              <ShieldCheck className="h-4 w-4" />
              <span>Importations directes certifiées</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout with Lateral Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] xl:gap-12">
          
          {/* ========================================================= */}
          {/* DESKTOP LATERAL SIDEBAR                                   */}
          {/* ========================================================= */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              {/* Category Navigation Section */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-white/5">
                <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3 dark:border-white/10">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink dark:text-white">
                    Catégories
                  </h3>
                  <span className="text-[11px] font-medium text-stone-400">
                    {products.length} réf.
                  </span>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setCategory('tous')}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                      category === 'tous'
                        ? 'bg-ink text-white shadow-xs dark:bg-white dark:text-ink'
                        : 'text-stone-600 hover:bg-mist hover:text-ink dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
                    }`}
                  >
                    <span>Tous les produits</span>
                    <span className={`text-[11px] ${category === 'tous' ? 'text-white/80 dark:text-ink/70' : 'text-stone-400'}`}>
                      {categoryCounts.tous}
                    </span>
                  </button>

                  {categories.map(c => {
                    const count = categoryCounts[c.slug] || 0
                    const isActive = category === c.slug
                    return (
                      <button
                        key={c.slug}
                        onClick={() => setCategory(c.slug)}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                          isActive
                            ? 'bg-ink text-white shadow-xs dark:bg-white dark:text-ink'
                            : 'text-stone-600 hover:bg-mist hover:text-ink dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-2 text-left">{c.name}</span>
                        <span className={`text-[11px] ${isActive ? 'text-white/80 dark:text-ink/70' : 'text-stone-400'}`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Lateral Advice Box */}
              <div className="rounded-2xl border border-stone-200/80 bg-mist/60 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Besoin d'un conseil ?</p>
                <h4 className="mt-1 font-display text-base font-semibold text-ink dark:text-white">
                  Quelle routine choisir ?
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-white/60">
                  Nos spécialistes vous orientent selon votre type de peau et vos objectifs.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    'Bonjour Milfleurs, j’aimerais un conseil personnalisé sur votre catalogue.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-ink border border-stone-200 shadow-xs transition hover:border-stone-400 hover:bg-stone-50 dark:bg-white/10 dark:border-white/15 dark:text-white dark:hover:bg-white/20"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Poser une question
                </a>
              </div>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* MAIN CONTENT AREA                                         */}
          {/* ========================================================= */}
          <main>
            {/* Top Toolbar (Search, Filter Button for Mobile, Sort) */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <label className="flex flex-1 items-center gap-3 rounded-full border border-stone-200/90 bg-white px-4 py-2.5 transition focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/15 dark:border-white/15 dark:bg-white/5">
                <Search className="h-4 w-4 text-stone-400" />
                <input
                  className="w-full bg-transparent text-xs sm:text-sm outline-none placeholder:text-stone-400 dark:text-white"
                  placeholder="Rechercher un soin, sérum, crème, vitamine..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-white"
                  >
                    Effacer
                  </button>
                )}
              </label>

              <div className="flex items-center gap-2">
                {/* Mobile Category Trigger Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex h-10 items-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-xs font-semibold text-ink shadow-xs transition hover:bg-stone-50 lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
                >
                  <Filter className="h-3.5 w-3.5 text-gold" />
                  <span>Catégories ({category === 'tous' ? 'Toutes' : currentCategoryObj?.name})</span>
                </button>

                {/* Sort dropdown */}
                <select
                  className="h-10 rounded-full border border-stone-200/90 bg-white px-4 text-xs font-semibold text-ink outline-none transition focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white"
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                >
                  <option value="nouveautes">Nouveautés d'abord</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                  <option value="alpha">Ordre alphabétique</option>
                </select>
              </div>
            </div>

            {/* Active filters indicators */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3 text-xs dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink dark:text-white">
                  {filtered.length} produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
                </span>
                {category !== 'tous' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-ink dark:bg-white/10 dark:text-white">
                    {currentCategoryObj?.name}
                    <button
                      onClick={() => setCategory('tous')}
                      className="ml-1 hover:text-rose-600"
                      aria-label="Supprimer le filtre de catégorie"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>

              {category !== 'tous' && (
                <button
                  onClick={() => setCategory('tous')}
                  className="text-stone-400 hover:text-ink underline text-[11px] dark:hover:text-white"
                >
                  Afficher tout le catalogue
                </button>
              )}
            </div>

            {/* Product Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-3">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-stone-200/80 bg-mist/60 px-6 py-20 text-center dark:border-white/10 dark:bg-white/5">
                <Search className="mx-auto h-8 w-8 text-stone-400" />
                <h2 className="mt-4 font-display text-2xl font-normal text-ink dark:text-white">
                  Aucun produit ne correspond à ces critères
                </h2>
                <p className="mt-2 text-sm text-stone-500 dark:text-white/60">
                  Essayez un autre mot-clé ou sélectionnez une autre catégorie.
                </p>
                <button
                  onClick={() => { setQuery(''); setCategory('tous') }}
                  className="mt-6 rounded-full bg-ink px-6 py-3 text-xs font-semibold text-white shadow-xs transition hover:bg-black dark:bg-white dark:text-ink"
                >
                  Voir tous les produits
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE CATEGORY DRAWER                                    */}
      {/* ========================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <aside className="relative ml-auto flex h-full w-[300px] flex-col bg-white p-6 shadow-2xl dark:bg-[#1A1517]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 dark:border-white/10">
              <h3 className="font-display text-lg font-semibold text-ink dark:text-white">
                Filtrer par Univers
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-stone-100 text-stone-700 dark:bg-white/10 dark:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto space-y-1 pr-1">
              <button
                onClick={() => { setCategory('tous'); setMobileFilterOpen(false) }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition ${
                  category === 'tous'
                    ? 'bg-ink text-white dark:bg-white dark:text-ink'
                    : 'text-stone-700 hover:bg-stone-50 dark:text-white/80 dark:hover:bg-white/10'
                }`}
              >
                <span>Tous les produits</span>
                <span>{categoryCounts.tous}</span>
              </button>

              {categories.map(c => {
                const count = categoryCounts[c.slug] || 0
                const isActive = category === c.slug
                return (
                  <button
                    key={c.slug}
                    onClick={() => { setCategory(c.slug); setMobileFilterOpen(false) }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition ${
                      isActive
                        ? 'bg-ink text-white dark:bg-white dark:text-ink'
                        : 'text-stone-700 hover:bg-stone-50 dark:text-white/80 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span>{count}</span>
                  </button>
                )
              })}
            </div>

            <div className="border-t border-stone-200 pt-4 dark:border-white/10">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-full bg-ink py-3 text-xs font-semibold text-white dark:bg-white dark:text-ink"
              >
                Voir les résultats ({filtered.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
