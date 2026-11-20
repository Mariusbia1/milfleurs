import { Link } from 'react-router-dom'
import { Instagram, Facebook, ShieldCheck, Truck, Sparkles, MessageCircle } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-ink text-white dark:border-white/10 dark:bg-[#110E10]">
      {/* Top Reassurance Row */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">100% Authentique</p>
              <p className="text-xs text-white/60">Import direct d’Europe, USA & Corée</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Livraison Express</p>
              <p className="text-xs text-white/60">En 24 à 48h à Cotonou et alentours</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Conseils & Suivi</p>
              <p className="text-xs text-white/60">Équipe dédiée à votre écoute</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block font-display text-3xl tracking-tight text-white">
            Mil<span className="italic text-gold">fleurs</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <MessageCircle className="h-3.5 w-3.5 text-gold" />
              Commander sur WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Explorer</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link to="/collections" className="transition hover:text-white">La Boutique</Link></li>
            <li><Link to="/a-propos" className="transition hover:text-white">Notre Histoire</Link></li>
            <li><Link to="/galerie" className="transition hover:text-white">Nos Univers</Link></li>
            <li><Link to="/faq" className="transition hover:text-white">Questions fréquentes</Link></li>
            <li><Link to="/livraison-et-retours" className="transition hover:text-white">Livraison & Retours</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</h3>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <p className="font-medium text-white">{siteConfig.address}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
            <div className="flex gap-4 pt-2">
              <a href={siteConfig.instagram} aria-label="Instagram" className="text-white/70 transition hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={siteConfig.facebook} aria-label="Facebook" className="text-white/70 transition hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Milfleurs. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/politique-de-confidentialite" className="hover:text-white/80">Confidentialité</Link>
            <Link to="/conditions-generales" className="hover:text-white/80">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
