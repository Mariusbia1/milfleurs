import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, MessageCircle, Mail, MapPin, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import Accordion from '../../components/common/Accordion'
import { gallery } from '../../data/gallery'
import { faq } from '../../data/faq'
import { siteConfig } from '../../config/siteConfig'
import heroImage from '../../assets/milfleur-hero.png'

export function AboutPage() {
  return (
    <>
      <SEO title="Notre histoire | Milfleurs" />

      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-mist/60 py-20 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Notre histoire</p>
          <h1 className="mt-4 font-display text-4xl font-normal sm:text-5xl md:text-6xl text-ink dark:text-white">
            Rendre la beauté authentique accessible.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-white/70">
            Milfleurs est née d’une mission exigeante : proposer un accès direct, transparent et garanti à des soins dermocosmétiques et compléments d’excellence, sans risque de contrefaçon.
          </p>
        </div>
      </section>

      {/* Split Story Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 dark:border-white/10">
            <img
              src={heroImage}
              alt="Sélection beauté et bien-être Milfleurs"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Notre promesse</p>
            <h2 className="font-display text-3xl font-normal sm:text-4xl text-ink dark:text-white">
              La confiance comme signature
            </h2>
            <p className="leading-relaxed text-stone-600 dark:text-white/70">
              Dans notre boutique, chaque référence est rigoureusement évaluée avant d'être intégrée au catalogue. Nous travaillons exclusivement avec des canaux certifiés en France, aux États-Unis et en Corée du Sud.
            </p>
            <p className="leading-relaxed text-stone-600 dark:text-white/70">
              Parce que votre peau et votre santé méritent ce qu'il y a de plus sûr, tous nos produits sont scellés d’origine et expédiés avec une traçabilité totale.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                <ShieldCheck className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-semibold text-sm text-ink dark:text-white">100% Vérifié</h3>
                <p className="mt-1 text-xs text-stone-500 dark:text-white/60">Circuits courts et officiels.</p>
              </div>
              <div className="rounded-2xl border border-stone-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                <HeartHandshake className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-semibold text-sm text-ink dark:text-white">Conseil Expert</h3>
                <p className="mt-1 text-xs text-stone-500 dark:text-white/60">Écoute attentive sur WhatsApp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function GalleryPage() {
  const [active, setActive] = useState(null)

  return (
    <>
      <SEO title="Nos univers | Milfleurs" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Inspirations & Rituels</p>
          <h1 className="mt-3 font-display text-4xl font-normal sm:text-5xl text-ink dark:text-white">Nos univers</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-stone-500 dark:text-white/60">
            Une immersion dans nos différentes gammes de soins et de compléments bien-être.
          </p>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 text-left transition hover:shadow-soft dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={g.image}
                alt={g.title}
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold">{g.category}</p>
                <p className="font-display text-sm font-semibold">{g.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog">
          <button
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive((active - 1 + gallery.length) % gallery.length)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="max-h-[85vh] max-w-[85vw] overflow-hidden rounded-2xl bg-white p-4">
            <img src={gallery[active].image} alt={gallery[active].title} className="max-h-[75vh] w-auto object-contain" />
            <p className="mt-3 text-center font-display text-lg font-semibold text-ink">{gallery[active].title}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive((active + 1) % gallery.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <SEO title="Contact | Milfleurs" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">À votre écoute</p>
          <h1 className="mt-3 font-display text-3xl font-normal sm:text-4xl md:text-5xl text-ink dark:text-white">
            Une question sur un soin ou une commande ?
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-white/70">
            Écrivez-nous directement. Notre équipe vous conseille pour choisir les formules les plus adaptées à vos besoins.
          </p>

          <div className="mt-10 space-y-5 text-sm">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-mist text-gold dark:bg-white/10">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-400">WhatsApp & Téléphone</p>
                <p className="font-semibold text-ink dark:text-white">{siteConfig.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-mist text-gold dark:bg-white/10">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-400">E-mail</p>
                <p className="font-semibold text-ink dark:text-white">{siteConfig.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-mist text-gold dark:bg-white/10">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-stone-400">Localisation</p>
                <p className="font-semibold text-ink dark:text-white">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()} className="rounded-3xl border border-stone-200/80 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-xl font-semibold text-ink dark:text-white">Envoyez-nous un message</h2>
          <div className="mt-6 space-y-4">
            {['Nom complet', 'E-mail', 'Téléphone', 'Objet de votre message'].map(field => (
              <label key={field} className="block text-xs font-semibold text-stone-700 dark:text-white/80">
                {field}
                <input className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white" />
              </label>
            ))}
            <label className="block text-xs font-semibold text-stone-700 dark:text-white/80">
              Votre message
              <textarea rows="4" className="mt-1.5 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15 dark:border-white/15 dark:bg-white/5 dark:text-white" />
            </label>
            <Button type="submit" variant="dark" className="w-full">
              Envoyer le message
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export function FaqPage() {
  return (
    <>
      <SEO title="Questions fréquentes | Milfleurs" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Aide & Informations</p>
          <h1 className="mt-3 font-display text-4xl font-normal sm:text-5xl text-ink dark:text-white">Questions fréquentes</h1>
          <p className="mt-4 text-sm text-stone-500 dark:text-white/60">
            Retrouvez ici les réponses aux interrogations les plus courantes sur nos produits et la livraison.
          </p>
        </div>
        <Accordion items={faq} />
      </div>
    </>
  )
}

export function ConfirmationPage() {
  return (
    <>
      <SEO title="Commande transmise | Milfleurs" />
      <div className="grid min-h-[65vh] place-items-center px-4 py-20 text-center">
        <div className="max-w-md">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-normal text-ink sm:text-4xl dark:text-white">
            Votre demande est prête !
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-white/70">
            Votre commande a été préparée pour WhatsApp. Il vous suffit d'envoyer le message pour que notre équipe confirme vos articles et planifie la livraison.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/" variant="dark">
              Retour à l’accueil
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function LegalPage({ title }) {
  return (
    <>
      <SEO title={`${title} | Milfleurs`} />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h1 className="font-display text-3xl font-normal sm:text-4xl md:text-5xl text-ink dark:text-white">{title}</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600 dark:text-white/70">
          <p>
            Cette page présente les mentions de référence de Milfleurs. Notre engagement porte sur la transparence, la protection de vos données personnelles et l’authenticité des articles distribués.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Commandes & Règlements</h2>
          <p>
            Les commandes initiées sur ce site sont validées et confirmées en échange direct avec nos conseillers via WhatsApp. Aucun débit n'est effectué directement sur le site.
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">Délais de livraison</h2>
          <p>
            Les délais habituels sont de 24 à 48 heures pour les livraisons à Cotonou et ses environs, et de 3 à 7 jours ouvrés pour les expéditions régionales ou internationales.
          </p>
        </div>
      </article>
    </>
  )
}
