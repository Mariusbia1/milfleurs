import { Check, Heart, Plus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const canQuickAdd = !product.sizes.length && !product.colors.length
  const badge = product.newProduct ? 'Nouveau' : product.popular ? 'Coup de cœur' : null

  return <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-rose/10 bg-white shadow-[0_12px_40px_rgba(99,24,57,.08)] transition duration-500 hover:-translate-y-1.5 hover:border-rose/25 hover:shadow-[0_24px_60px_rgba(99,24,57,.15)] dark:bg-white/5">
    <div className="relative aspect-square overflow-hidden bg-white p-3 sm:p-5">
      <Link to={`/collections/${product.slug}`} className="block h-full">
        <img loading="lazy" src={product.images[0]} alt={product.name} className="h-full w-full rounded-2xl object-contain transition duration-700 group-hover:scale-[1.04]" />
      </Link>
      {badge && <span className="absolute left-3 top-3 rounded-full bg-plum px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[.12em] text-white shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">{badge}</span>}
      <button aria-label="Ajouter aux favoris" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-rose/15 bg-white text-plum shadow-sm transition hover:bg-mist hover:text-gold sm:right-4 sm:top-4"><Heart className="h-4 w-4" /></button>
    </div>
    <div className="flex flex-1 flex-col border-t border-rose/10 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-bold uppercase tracking-[.16em] text-gold sm:text-[10px]">{product.category}</p>
        <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-700"><Check className="h-3 w-3" /> En stock</span>
      </div>
      <Link to={`/collections/${product.slug}`} className="mt-2 block font-display text-lg leading-tight transition hover:text-gold sm:text-xl">{product.name}</Link>
      <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-black/50 sm:text-xs">{product.shortDescription}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
        <div>
          {product.oldPrice && <p className="text-[10px] text-black/40 line-through">{formatCurrency(product.oldPrice)}</p>}
          <p className="font-bold text-gold sm:text-lg">{formatCurrency(product.price)}</p>
        </div>
        <button onClick={() => canQuickAdd && addItem(product)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-rose text-white shadow-rose transition hover:scale-105" aria-label={`Ajouter ${product.name} au panier`}>
          {canQuickAdd ? <Plus className="h-5 w-5" /> : <ShoppingBag className="h-4 w-4" />}
        </button>
      </div>
    </div>
  </article>
}
