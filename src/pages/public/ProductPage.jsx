import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Minus, Plus, MessageCircle, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import ProductCard from '../../components/products/ProductCard'
import { products } from '../../data/products'
import { formatCurrency } from '../../utils/formatCurrency'
import { useCart } from '../../contexts/CartContext'
import { siteConfig } from '../../config/siteConfig'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [measurements, setMeasurements] = useState('')
  const [note, setNote] = useState('')

  if (!product) {
    return (
      <div className="px-4 py-32 text-center">
        <h1 className="font-display text-3xl sm:text-4xl">Produit introuvable</h1>
        <p className="mt-3 text-sm text-stone-500">Ce produit n’existe pas ou n’est plus disponible.</p>
        <Button to="/collections" className="mt-6">Retour à la boutique</Button>
      </div>
    )
  }

  const validate = () => {
    if (product.sizes.length && !size) {
      toast.error('Veuillez choisir une taille.')
      return false
    }
    if (product.colors.length && !color) {
      toast.error('Veuillez choisir une couleur.')
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (validate()) {
      addItem(product, { size, color, quantity, measurements, note })
      toast.success(`${product.name} ajouté au panier !`)
    }
  }

  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)

  return (
    <>
      <SEO title={`${product.name} | Milfleurs`} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-stone-500 dark:text-white/60">
          <Link to="/" className="hover:text-ink dark:hover:text-white">Accueil</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-ink dark:hover:text-white">Boutique</Link>
          <span>/</span>
          <Link to={`/categories/${product.categorySlug}`} className="hover:text-ink dark:hover:text-white">{product.category}</Link>
          <span>/</span>
          <span className="truncate text-ink font-medium dark:text-white">{product.name}</span>
        </nav>

        {/* Product Details Layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery View */}
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-stone-200/80 bg-[#FBF9F7] p-6 dark:border-white/10 dark:bg-white/5">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-[#FBF9F7] p-1 transition ${
                      activeImage === i ? 'border-ink dark:border-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Panel */}
          <div className="flex flex-col justify-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {product.category}
            </span>

            <h1 className="mt-2 font-display text-3xl font-normal leading-tight sm:text-4xl md:text-5xl text-ink dark:text-white">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <p className="text-2xl font-bold text-ink dark:text-white">
                {formatCurrency(product.price)}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-stone-400 line-through">
                  {formatCurrency(product.oldPrice)}
                </p>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs font-medium text-stone-700 dark:border-white/15 dark:bg-white/5 dark:text-white">
                <Check className="h-3 w-3" /> En stock
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-white/70">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-8">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-white">
                  Couleur : <span className="font-normal text-stone-500">{color || 'Sélectionner'}</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        color === c
                          ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400 dark:border-white/20 dark:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-white">
                  Taille / Format
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-12 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        size === s
                          ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400 dark:border-white/20 dark:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-12 w-fit items-center rounded-full border border-stone-200 bg-white px-2 dark:border-white/20 dark:bg-white/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="grid h-8 w-8 place-items-center text-stone-600 hover:text-ink dark:text-white"
                  aria-label="Diminuer"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-ink dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="grid h-8 w-8 place-items-center text-stone-600 hover:text-ink dark:text-white"
                  aria-label="Augmenter"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <Button onClick={handleAddToCart} className="flex-1" variant="dark">
                Ajouter au panier
              </Button>
            </div>

            {/* WhatsApp Direct Order Button */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Bonjour Milfleurs, je souhaite commander : ${product.name} (${formatCurrency(product.price)})`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-xs font-semibold text-ink transition hover:border-stone-400 hover:bg-stone-50 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 text-stone-600 dark:text-stone-300" />
              Commander directement sur WhatsApp
            </a>

            {/* Product Specifications Table */}
            <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200 text-xs dark:divide-white/10 dark:border-white/10">
              <div className="flex justify-between py-3.5">
                <span className="text-stone-500 dark:text-white/60">Disponibilité :</span>
                <span className="font-semibold text-ink dark:text-white">En stock (expédition 24-48h)</span>
              </div>
              <div className="flex justify-between py-3.5">
                <span className="text-stone-500 dark:text-white/60">Origine & Authenticité :</span>
                <span className="font-semibold text-ink dark:text-white">{product.materials}</span>
              </div>
              <div className="flex justify-between py-3.5">
                <span className="text-stone-500 dark:text-white/60">Conseils d'utilisation :</span>
                <span className="font-semibold text-ink text-right dark:text-white">{product.careInstructions}</span>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-stone-200/80 bg-mist/60 p-4 text-center dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span className="text-[11px] font-semibold text-ink dark:text-white">Authenticité garantie</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-gold" />
                <span className="text-[11px] font-semibold text-ink dark:text-white">Livraison rapide</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-gold" />
                <span className="text-[11px] font-semibold text-ink dark:text-white">Conseils personnalisés</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-stone-200/80 pt-16 dark:border-white/10">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Suggestions</p>
              <h2 className="mt-2 font-display text-3xl font-normal text-ink dark:text-white">
                Vous aimerez aussi
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
