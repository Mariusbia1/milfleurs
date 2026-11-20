import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, HeartPulse, PackageCheck, Star, MessageCircle, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import ProductCard from '../../components/products/ProductCard'
import Accordion from '../../components/common/Accordion'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { testimonials } from '../../data/testimonials'
import { faq } from '../../data/faq'
import { siteConfig } from '../../config/siteConfig'
import heroImage from '../../assets/milfleur-hero.png'
import skincareImage from '../../assets/milfleur-skincare.png'

const SectionTitle = ({ eyebrow, children, subtitle, action }) => (
  <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-normal sm:text-4xl text-ink dark:text-white">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-white/60">
          {subtitle}
        </p>
      )}
    </div>
    {action}
  </div>
)

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured)
  const productRailRef = useRef(null)
  const testimonialRailRef = useRef(null)
  const [productScrollProgress, setProductScrollProgress] = useState(0)

  const scrollRail = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleProductScroll = () => {
    if (productRailRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productRailRef.current
      const progress = scrollWidth > clientWidth ? (scrollLeft / (scrollWidth - clientWidth)) * 100 : 0
      setProductScrollProgress(progress)
    }
  }

  return (
    <>
      <SEO title="Milfleurs | Beauté, soins & compléments authentiques" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] overflow-hidden bg-[#F6F2EE] dark:bg-[#181316]">
        <img
          src={heroImage}
          alt="Sélection beauté et bien-être Milfleurs"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wider text-ink/80 backdrop-blur-md shadow-xs dark:bg-black/60 dark:text-white dark:border-white/20">
              <Award className="h-3.5 w-3.5 text-gold" />
              <span>Cosmétiques & Compléments Sélectionnés</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-normal leading-[1.08] text-ink sm:text-6xl md:text-7xl dark:text-white">
              Votre beauté,<br />
              <span className="italic font-normal text-gold">notre sélection.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-700 sm:text-lg dark:text-white/70">
              Soins dermocosmétiques, cosmétiques K-Beauty et compléments nutritionnels authentiques, directement importés d’Europe, des États-Unis et de Corée.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button to="/collections" variant="dark">
                Découvrir la boutique
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to={`https://wa.me/${siteConfig.whatsapp}`}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Conseil WhatsApp
              </Button>
            </div>

            {/* Reassurance Metrics */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-stone-300/60 pt-8 dark:border-white/10">
              <div>
                <span className="block font-display text-2xl font-bold text-ink sm:text-3xl dark:text-white">100%</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider dark:text-white/60">Authentique</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-ink sm:text-3xl dark:text-white">3</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider dark:text-white/60">Continents</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-ink sm:text-3xl dark:text-white">24–48h</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider dark:text-white/60">Expédition</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Intro Statement */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
          L’art de prendre soin de soi
        </p>
        <h2 className="mt-4 font-display text-3xl font-normal leading-snug sm:text-4xl md:text-5xl text-ink dark:text-white">
          Des essentiels choisis avec rigueur.<br />
          <span className="italic text-gold">Pour vous révéler pleinement.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-white/70">
          Nous sélectionnons des formules éprouvées et des marques de confiance pour vous offrir une routine simple, efficace et parfaitement adaptée à vos exigences cutanées et de bien-être.
        </p>
      </section>

      {/* Featured Products - Conforme au format scroll des boutiques e-commerce */}
      <section className="bg-mist/70 py-16 md:py-20 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Les incontournables"
            subtitle="Faites défiler nos meilleures références pour sublimer votre rituel quotidien."
            action={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollRail(productRailRef, 'left')}
                  className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-stone-400 hover:text-ink dark:border-white/15 dark:bg-white/5 dark:text-white"
                  aria-label="Faire défiler vers la gauche"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollRail(productRailRef, 'right')}
                  className="grid h-10 w-10 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs transition hover:border-stone-400 hover:text-ink dark:border-white/15 dark:bg-white/5 dark:text-white"
                  aria-label="Faire défiler vers la droite"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            }
          >
            Nos coups de cœur
          </SectionTitle>

          {/* Horizontal Scroll-Snap Product Rail */}
          <div
            ref={productRailRef}
            onScroll={handleProductScroll}
            className="ecommerce-scroll-rail gap-4 sm:gap-6 pb-6 pt-2"
          >
            {featuredProducts.map(p => (
              <div
                key={p.id}
                className="ecommerce-scroll-item w-[270px] sm:w-[290px] md:w-[310px]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* E-Commerce Scroll Progress Bar */}
          <div className="mt-4 flex items-center justify-between">
            <div className="h-1 flex-1 max-w-xs overflow-hidden rounded-full bg-stone-200/80 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gold transition-all duration-150"
                style={{ width: `${Math.max(15, productScrollProgress)}%` }}
              />
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
            >
              <span>Voir tout le catalogue ({products.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid / Scroll */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionTitle
          eyebrow="Explorer"
          subtitle="Parcourez nos différents univers de beauté et de santé."
        >
          Votre routine, à votre façon
        </SectionTitle>

        {/* Scrollable categories on mobile, grid on tablet & desktop */}
        <div className="ecommerce-scroll-rail gap-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/categories/${c.slug}`}
              className={`${
                i === 0 || i === 5 ? 'md:col-span-2' : ''
              } ecommerce-scroll-item w-[260px] md:w-auto group relative h-64 overflow-hidden rounded-2xl bg-stone-100 md:h-80`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-display text-xl font-medium text-white sm:text-2xl">
                  {c.name}
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/80 opacity-0 transition group-hover:opacity-100">
                  Explorer la gamme <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Exigence / Editorial Highlight */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-linen/50 dark:border-white/10 dark:bg-white/5">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[380px] md:min-h-[500px]">
              <img
                src={skincareImage}
                alt="Routine de soins sélectionnée par Milfleurs"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center p-8 sm:p-12 md:p-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Notre engagement
                </p>
                <h2 className="mt-4 font-display text-3xl font-normal sm:text-4xl md:text-5xl text-ink dark:text-white">
                  L’authenticité sans compromis
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-white/70">
                  Dans un marché saturé de contrefaçons, Milfleurs vous garantit l’accès à des produits 100% certifiés, scellés et issus de réseaux officiels en France, aux USA et en Corée.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink dark:text-white">Traçabilité & Qualité</h4>
                      <p className="text-xs text-stone-500 dark:text-white/60">Chaque lot est vérifié pour assurer sa conformité et son intégrité d’origine.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <h4 className="text-sm font-semibold text-ink dark:text-white">Accompagnement d’experts</h4>
                      <p className="text-xs text-stone-500 dark:text-white/60">Une équipe disponible pour vous conseiller sur votre routine adaptée.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Button to="/a-propos" variant="outline">
                    En savoir plus sur Milfleurs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            [BadgeCheck, 'Produits 100% Authentiques', 'Directement importés auprès de fournisseurs agréés et certifiés.'],
            [Award, 'Sélection Ciblée', 'Des formules dermatologiques et nutritionnelles plébiscitées.'],
            [HeartPulse, 'Beauté & Bien-être', 'Une approche globale qui allie soins extérieurs et compléments internes.'],
            [PackageCheck, 'Livraison Soignée', 'Colis sécurisés et expédiés rapidement à Cotonou et à l’international.'],
          ].map(([Icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-stone-200/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-gold dark:bg-white/10">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Conforme au scroll des avis e-commerce */}
      <section className="border-y border-stone-200/80 bg-ink py-20 text-white dark:border-white/10 dark:bg-[#110E10]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Témoignages clients
              </p>
              <h2 className="font-display text-3xl font-normal sm:text-4xl text-white">
                La communauté Milfleurs
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollRail(testimonialRailRef, 'left')}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollRail(testimonialRailRef, 'right')}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
                aria-label="Avis suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Scroll Rail */}
          <div
            ref={testimonialRailRef}
            className="ecommerce-scroll-rail gap-6 pb-4"
          >
            {testimonials.map(t => (
              <blockquote
                key={t.name}
                className="ecommerce-scroll-item w-[300px] sm:w-[360px] flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20"
              >
                <div>
                  <div className="flex gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/90">
                    « {t.text} »
                  </p>
                </div>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-white/50">{t.city} • Achat vérifié</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Questions fréquentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal sm:text-4xl text-ink dark:text-white">
            Tout ce que vous devez savoir avant de commander
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-white/60">
            Une question spécifique ? Notre équipe est également à votre disposition en direct par message pour vous renseigner.
          </p>
          <div className="mt-8">
            <Button
              to={`https://wa.me/${siteConfig.whatsapp}`}
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Poser une question sur WhatsApp
            </Button>
          </div>
        </div>
        <Accordion items={faq} />
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-stone-200/80 bg-mist/60 px-4 py-16 text-center sm:px-6 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            Prêt à commencer ?
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal sm:text-4xl text-ink dark:text-white">
            Votre nouvelle routine commence ici.
          </h2>
          <p className="mt-4 text-sm text-stone-600 dark:text-white/70">
            Explorez notre catalogue de cosmétiques authentiques et trouvez vos essentiels dès aujourd’hui.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button to="/collections" variant="dark">
              Explorer la boutique
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
