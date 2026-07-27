import { useMemo, useState } from 'react'
import { ChevronRight, Search, Sparkles } from 'lucide-react'
import SEO from '../../components/common/SEO'
import ProductCard from '../../components/products/ProductCard'
import { products } from '../../data/products'
import { categories } from '../../data/categories'

export default function ShopPage({ categorySlug }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categorySlug || 'tous')
  const [sort, setSort] = useState('nouveautes')

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

  const groupedProducts = useMemo(() => categories
    .map(item => ({ ...item, products: filtered.filter(product => product.categorySlug === item.slug) }))
    .filter(item => item.products.length), [filtered])

  return <><SEO title="Boutique beauté & bien-être | Milfleurs" />
    <section className="bg-gradient-to-br from-mist via-linen to-blush px-5 py-16 text-center md:py-20 dark:from-plum dark:via-[#651d41] dark:to-[#321121]">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">La sélection Milfleurs</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl">La boutique</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/60">Des soins, cosmétiques et compléments authentiques, organisés par univers pour trouver facilement votre prochain essentiel.</p>
    </section>

    <div className="sticky top-20 z-30 border-b border-rose/10 bg-white/95 shadow-sm backdrop-blur-xl dark:bg-plum/95">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-full border border-rose/20 bg-mist/60 px-5 py-3.5 focus-within:border-gold focus-within:ring-4 focus-within:ring-rose/10">
            <Search className="h-4 w-4 text-gold" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Rechercher un produit, un soin…" value={query} onChange={e => setQuery(e.target.value)} />
          </label>
          <select className="rounded-full border border-rose/20 bg-white px-5 py-3.5 text-sm" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="nouveautes">Nouveautés</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="alpha">Ordre alphabétique</option>
          </select>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          <button onClick={() => setCategory('tous')} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${category === 'tous' ? 'bg-plum text-white shadow-sm' : 'bg-mist text-plum hover:bg-linen'}`}>Tous les produits</button>
          {categories.map(item => <button key={item.slug} onClick={() => setCategory(item.slug)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${category === item.slug ? 'bg-plum text-white shadow-sm' : 'bg-mist text-plum hover:bg-linen'}`}>{item.name}</button>)}
        </div>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <p className="text-sm text-black/55"><b className="text-ink dark:text-white">{filtered.length}</b> produit{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
        <span className="hidden items-center gap-2 text-xs font-semibold text-gold sm:flex"><Sparkles className="h-4 w-4" /> Sélection authentique</span>
      </div>

      {groupedProducts.length ? <div className="space-y-20">
        {groupedProducts.map(group => <section key={group.slug} id={group.slug}>
          <div className="mb-7 flex items-end justify-between border-b border-rose/15 pb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">Univers Milfleurs</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">{group.name}</h2>
            </div>
            <button onClick={() => setCategory(group.slug)} className="hidden items-center gap-1 text-xs font-bold text-gold hover:text-plum sm:flex">Voir uniquement <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
            {group.products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>)}
      </div> : <div className="rounded-[2rem] bg-mist px-5 py-20 text-center">
        <Search className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-4 font-display text-3xl">Aucun produit trouvé</h2>
        <p className="mt-2 text-sm text-black/50">Essayez un autre mot ou affichez toutes les catégories.</p>
        <button onClick={() => { setQuery(''); setCategory('tous') }} className="mt-6 rounded-full bg-plum px-6 py-3 text-sm font-bold text-white">Réinitialiser la recherche</button>
      </div>}
    </main>
  </>
}
