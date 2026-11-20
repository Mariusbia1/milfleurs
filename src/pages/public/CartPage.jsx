import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, ArrowRight } from 'lucide-react'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, deliveryFee, total, itemCount } = useCart()

  const MobileTopbar = () => (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-ivory/95 px-4 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-plum/95">
      <Link
        to="/collections"
        className="grid h-9 w-9 place-items-center rounded-full bg-mist text-ink dark:bg-white/10 dark:text-white"
        aria-label="Retour à la boutique"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="text-center">
        <h1 className="font-display text-lg font-semibold text-ink dark:text-white">Mon panier</h1>
        <p className="text-[10px] uppercase tracking-wider text-gold">
          {itemCount} article{itemCount > 1 ? 's' : ''}
        </p>
      </div>
      <div className="w-9" />
    </div>
  )

  if (!items.length) {
    return (
      <>
        <SEO title="Panier | Milfleurs" />
        <MobileTopbar />
        <div className="grid min-h-[65vh] place-items-center px-4 py-20 text-center">
          <div className="max-w-md">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-mist text-gold dark:bg-white/5">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-normal text-ink dark:text-white">
              Votre panier est vide
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-white/60">
              Découvrez notre sélection beauté et compléments pour composer votre routine sur-mesure.
            </p>
            <div className="mt-8">
              <Button to="/collections" variant="dark">
                Découvrir la boutique
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Votre panier | Milfleurs" />
      <MobileTopbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
        <div className="hidden border-b border-stone-200/80 pb-6 md:block dark:border-white/10">
          <h1 className="font-display text-4xl font-normal text-ink dark:text-white">
            Votre Panier
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-white/60">
            {itemCount} produit{itemCount > 1 ? 's' : ''} sélectionné{itemCount > 1 ? 's' : ''}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Items List */}
          <div>
            <div className="divide-y divide-stone-200/80 border-y border-stone-200/80 dark:divide-white/10 dark:border-white/10">
              {items.map(item => (
                <article
                  key={item.lineKey}
                  className="grid grid-cols-[88px_1fr] gap-4 py-6 md:grid-cols-[110px_1fr_auto] md:gap-6"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 p-2 dark:bg-white/5">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/collections/${item.slug}`}
                        className="font-display text-base font-semibold text-ink transition hover:text-gold md:text-lg dark:text-white"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-stone-500 dark:text-white/60">
                        {[item.size && `Format ${item.size}`, item.color].filter(Boolean).join(' · ')}
                      </p>
                      {item.note && (
                        <p className="mt-1 text-xs text-stone-400 italic">
                          "{item.note}"
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex w-fit items-center rounded-full border border-stone-200 bg-white px-1.5 py-0.5 dark:border-white/15 dark:bg-white/5">
                      <button
                        onClick={() => updateQuantity(item.lineKey, item.quantity - 1)}
                        className="p-1.5 text-stone-600 hover:text-ink dark:text-white"
                        aria-label="Diminuer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-ink dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.lineKey, item.quantity + 1)}
                        className="p-1.5 text-stone-600 hover:text-ink dark:text-white"
                        aria-label="Augmenter"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="col-start-2 flex items-end justify-between md:col-start-auto md:flex-col md:items-end">
                    <p className="text-base font-bold text-ink dark:text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.lineKey)}
                      className="flex items-center gap-1 text-xs text-stone-400 transition hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs">
              <Link to="/collections" className="font-semibold text-ink underline underline-offset-4 hover:text-gold dark:text-white">
                ← Continuer mes achats
              </Link>
              <button
                onClick={clearCart}
                className="text-stone-400 transition hover:text-stone-700 dark:hover:text-white"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Sticky Summary */}
          <aside className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5 lg:sticky lg:top-28 lg:h-fit">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
              Récapitulatif
            </h2>

            <div className="mt-6 space-y-3 border-b border-stone-200/80 pb-6 text-sm dark:border-white/10">
              <div className="flex justify-between text-stone-600 dark:text-white/70">
                <span>Sous-total</span>
                <span className="font-medium text-ink dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-white/70">
                <span>Livraison estimée</span>
                <span className="font-medium text-ink dark:text-white">{formatCurrency(deliveryFee)}</span>
              </div>
            </div>

            <div className="my-5 flex items-baseline justify-between text-lg font-bold text-ink dark:text-white">
              <span>Total estimé</span>
              <span className="text-xl">{formatCurrency(total)}</span>
            </div>

            <Button to="/commande" className="w-full" variant="dark">
              Passer la commande <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-white/60">
              <ShieldCheck className="h-4 w-4 text-gold" />
              <span>Paiement & validation sur WhatsApp</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
