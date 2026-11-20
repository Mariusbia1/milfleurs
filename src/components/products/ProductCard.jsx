import { Check, Heart, Plus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const canQuickAdd = !product.sizes.length && !product.colors.length
  const badge = product.newProduct ? 'Nouveau' : product.popular ? 'Coup de cœur' : null

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-soft dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20">
      <div className="relative aspect-square overflow-hidden bg-[#FBF9F7] p-4 sm:p-5 dark:bg-white/5">
        <Link to={`/collections/${product.slug}`} className="block h-full w-full">
          <img
            loading="lazy"
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold tracking-wider text-white shadow-xs backdrop-blur-sm sm:left-4 sm:top-4 dark:bg-white dark:text-ink">
            {badge}
          </span>
        )}

        <button
          aria-label="Ajouter aux favoris"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-stone-200/80 bg-white/90 text-stone-700 shadow-xs transition hover:border-stone-400 hover:text-ink sm:right-4 sm:top-4 dark:border-white/20 dark:bg-black/60 dark:text-white"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col border-t border-stone-100 p-4 sm:p-5 dark:border-white/5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
            {product.category}
          </p>
          <span className="flex items-center gap-1 text-[10px] font-medium text-stone-500 dark:text-stone-300">
            <Check className="h-3 w-3" /> En stock
          </span>
        </div>

        <Link
          to={`/collections/${product.slug}`}
          className="mt-2 block font-display text-base font-semibold leading-snug text-ink transition hover:text-gold sm:text-lg dark:text-white"
        >
          {product.name}
        </Link>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500 sm:text-[13px] dark:text-white/60">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {product.oldPrice && (
              <p className="text-[11px] text-stone-400 line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            )}
            <p className="font-bold text-ink sm:text-base dark:text-white">
              {formatCurrency(product.price)}
            </p>
          </div>

          <button
            onClick={() => canQuickAdd && addItem(product)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-gold active:scale-95 dark:bg-white dark:text-ink dark:hover:bg-gold dark:hover:text-white"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {canQuickAdd ? <Plus className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </article>
  )
}
