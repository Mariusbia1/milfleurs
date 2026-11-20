import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { MessageCircle, ShieldCheck, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import { useCart } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
import { createWhatsAppMessage, whatsappUrl } from '../../services/whatsappService'

const initial = { name: '', phone: '', city: '', address: '', delivery: '', comment: '', terms: false }

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, total } = useCart()
  const [form, setForm] = useState(initial)
  const navigate = useNavigate()

  if (!items.length) return <Navigate to="/panier" replace />

  const change = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const submit = e => {
    e.preventDefault()
    const missing = ['name', 'phone', 'city', 'address', 'delivery'].some(k => !form[k].trim())
    if (missing || !form.terms) {
      toast.error('Veuillez compléter tous les champs obligatoires et accepter les conditions.')
      return
    }

    window.open(whatsappUrl(createWhatsAppMessage(form, items, total)), '_blank', 'noopener,noreferrer')
    sessionStorage.setItem('milfleur-last-order', JSON.stringify({ form, items, total }))
    navigate('/commande/confirmation')
  }

  return (
    <>
      <SEO title="Finaliser ma commande | Milfleurs" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        <Link
          to="/panier"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-ink dark:text-white/60 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au panier
        </Link>

        <div className="border-b border-stone-200/80 pb-6 dark:border-white/10">
          <h1 className="font-display text-3xl font-normal sm:text-4xl md:text-5xl text-ink dark:text-white">
            Finaliser votre commande
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-white/60">
            Complétez vos informations pour générer automatiquement votre message de commande WhatsApp.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Information Form */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
              Vos coordonnées de livraison
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-semibold text-stone-700 dark:text-white/80">
                Nom complet *
                <input
                  name="name"
                  required
                  placeholder="Ex: Aminata Diallo"
                  value={form.name}
                  onChange={change}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </label>

              <label className="text-xs font-semibold text-stone-700 dark:text-white/80">
                Numéro WhatsApp / Téléphone *
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Ex: +229 01 23 45 67"
                  value={form.phone}
                  onChange={change}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </label>

              <label className="text-xs font-semibold text-stone-700 dark:text-white/80">
                Ville *
                <input
                  name="city"
                  required
                  placeholder="Ex: Cotonou, Porto-Novo, Calavi..."
                  value={form.city}
                  onChange={change}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </label>

              <label className="text-xs font-semibold text-stone-700 dark:text-white/80">
                Quartier ou Adresse précise *
                <input
                  name="address"
                  required
                  placeholder="Ex: Haie Vive, Rue 34..."
                  value={form.address}
                  onChange={change}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </label>

              <label className="text-xs font-semibold text-stone-700 sm:col-span-2 dark:text-white/80">
                Mode de livraison *
                <select
                  name="delivery"
                  required
                  value={form.delivery}
                  onChange={change}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                >
                  <option value="">Sélectionnez un mode de livraison</option>
                  <option value="Livraison à domicile (Cotonou & environs)">Livraison à domicile (Cotonou & environs)</option>
                  <option value="Retrait en point relais / boutique">Retrait en point relais</option>
                  <option value="Expédition province ou international">Expédition province ou international</option>
                </select>
              </label>

              <label className="text-xs font-semibold text-stone-700 sm:col-span-2 dark:text-white/80">
                Remarques particulières (facultatif)
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={change}
                  rows="3"
                  placeholder="Instructions de livraison, créneau souhaité..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white"
                />
              </label>

              <label className="flex items-start gap-3 text-xs text-stone-600 sm:col-span-2 dark:text-white/70">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={form.terms}
                  onChange={change}
                  className="mt-0.5 rounded border-stone-300 text-gold focus:ring-gold"
                />
                <span>
                  J’accepte que ma commande soit transmise par WhatsApp à l’équipe Milfleurs pour confirmation définitive.
                </span>
              </label>
            </div>
          </div>

          {/* Sticky Summary */}
          <aside className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-white/5 lg:sticky lg:top-28 lg:h-fit">
            <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
              Votre commande
            </h2>

            <div className="mt-4 max-h-64 overflow-y-auto divide-y divide-stone-100 pr-1 dark:divide-white/5">
              {items.map(item => (
                <div key={item.lineKey} className="flex gap-3 py-3 text-xs">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100 p-1 dark:bg-white/5">
                    <img src={item.images[0]} alt="" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <b className="font-medium text-ink dark:text-white">{item.name}</b>
                    <p className="text-stone-400">Qté {item.quantity}{item.size ? ` · ${item.size}` : ''}</p>
                  </div>
                  <span className="font-semibold text-ink dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 border-t border-stone-200/80 pt-5 text-xs dark:border-white/10">
              <div className="flex justify-between text-stone-500 dark:text-white/60">
                <span>Sous-total</span>
                <span className="font-medium text-ink dark:text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-white/60">
                <span>Frais de livraison</span>
                <span className="font-medium text-ink dark:text-white">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold text-ink dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Button type="submit" variant="whatsapp" className="mt-6 w-full">
              <MessageCircle className="h-4 w-4" /> Confirmer sur WhatsApp
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span>Commande sécurisée · Aucun débit en ligne</span>
            </div>
          </aside>
        </form>
      </div>
    </>
  )
}
