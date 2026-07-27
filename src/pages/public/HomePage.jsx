import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, HeartPulse, PackageCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import Button from '../../components/common/Button'
import ProductCard from '../../components/products/ProductCard'
import Accordion from '../../components/common/Accordion'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { testimonials } from '../../data/testimonials'
import { faq } from '../../data/faq'
import heroImage from '../../assets/milfleur-hero.png'
import skincareImage from '../../assets/milfleur-skincare.png'

const SectionTitle = ({ eyebrow, children }) => <div className="mb-10 text-center"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.22em] text-gold">{eyebrow}</p><h2 className="font-display text-4xl md:text-5xl">{children}</h2></div>

export default function HomePage() {
  return <><SEO title="Milfleurs | Beauté, soins & compléments authentiques" />
    <section className="relative min-h-[82vh] overflow-hidden bg-[#f9dbe5]">
      <img src={heroImage} alt="Sélection beauté et bien-être Milfleurs" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-[#fff8fb] via-[#fff8fb]/80 to-transparent dark:from-[#1f0d18] dark:via-[#351527]/95 dark:to-[#351527]/55" />
      <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-5 py-16 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="inline-flex rounded-full border border-gold/25 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-gold shadow-sm backdrop-blur">Authentique · Importé · Sélectionné</span>
          <h1 className="mt-7 font-display text-5xl leading-[1.02] sm:text-7xl">Votre beauté,<br /><span className="italic text-gold">notre sélection.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/60">Cosmétiques, soins dermocosmétiques et compléments nutritionnels authentiques, importés d’Europe, des États-Unis et de Corée.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button to="/collections">Découvrir la boutique</Button><Button to="/contact" variant="outline">Nous demander conseil</Button></div>
          <div className="mt-10 flex flex-wrap gap-8 text-xs text-black/50"><span><b className="block font-display text-2xl text-gold">100%</b>authentique</span><span><b className="block font-display text-2xl text-gold">3</b>continents</span><span><b className="block font-display text-2xl text-gold">24–48h</b>expédition</span></div>
        </motion.div>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-5 py-24 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">La sélection Milfleurs</p><h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Des essentiels choisis avec soin.<br /><span className="italic text-gold">Pour vous sentir bien.</span></h2><p className="mx-auto mt-6 max-w-2xl leading-8 text-black/60">Nous réunissons des références beauté et bien-être appréciées pour vous offrir une routine simple, fiable et adaptée à vos besoins.</p></section>
    <section className="rounded-[3rem] bg-mist py-20 md:mx-5"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Les incontournables">Nos coups de cœur</SectionTitle><div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-7">{products.filter(p => p.featured).map(p => <ProductCard key={p.id} product={p} />)}</div><div className="mt-12 text-center"><Button to="/collections" variant="outline">Voir tous les produits <ArrowRight className="h-4 w-4" /></Button></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><SectionTitle eyebrow="Explorer">Votre routine, à votre façon</SectionTitle><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{categories.map((c, i) => <Link key={c.slug} to={`/categories/${c.slug}`} className={`${i === 0 || i === 5 ? 'md:col-span-2' : ''} group relative h-64 overflow-hidden rounded-[2rem] md:h-80`}><img src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-rose/10 to-transparent" /><span className="absolute bottom-5 left-5 font-display text-2xl text-white drop-shadow">{c.name}</span></Link>)}</div></section>
    <section className="grid overflow-hidden bg-linen md:mx-5 md:rounded-[3rem] md:grid-cols-2"><div className="relative min-h-[500px]"><img src={skincareImage} alt="Routine de soins sélectionnée par Milfleurs" className="absolute inset-0 h-full w-full object-cover" /></div><div className="flex items-center p-10 md:p-20"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Notre exigence</p><h2 className="mt-5 font-display text-4xl md:text-5xl">L’authenticité avant tout</h2><p className="mt-6 max-w-lg leading-8 text-black/65">Milfleurs privilégie des circuits d’approvisionnement fiables et des références soigneusement sélectionnées. Vous recevez des produits scellés, tracés et présentés avec des conseils clairs.</p><Button to="/a-propos" variant="outline" className="mt-8">Découvrir Milfleurs</Button></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-8 md:grid-cols-4">{[[BadgeCheck,'Produits authentiques'],[Sparkles,'Sélection experte'],[HeartPulse,'Beauté & bien-être'],[PackageCheck,'Livraison soignée']].map(([Icon,t]) => <div key={t} className="border-t border-gold pt-6"><Icon className="h-6 w-6 text-gold" /><h3 className="mt-4 font-display text-xl">{t}</h3><p className="mt-2 text-sm leading-6 text-black/55">Une attention sincère portée à chaque produit et à chaque commande.</p></div>)}</div></section>
    <section className="bg-gradient-to-br from-plum via-brown to-gold py-24 text-white"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Vos avis">La communauté Milfleurs</SectionTitle><div className="grid gap-5 md:grid-cols-4">{testimonials.map(t => <blockquote key={t.name} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"><p className="font-display text-xl leading-8">« {t.text} »</p><footer className="mt-6 text-xs uppercase tracking-wider text-sand">{t.name} — {t.city}</footer></blockquote>)}</div></div></section>
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Questions fréquentes</p><h2 className="mt-4 font-display text-4xl">Tout savoir avant de commander</h2></div><Accordion items={faq} /></section>
    <section className="bg-sand px-5 py-20 text-center"><h2 className="font-display text-4xl">Votre nouvelle routine commence ici.</h2><Button to="/collections" className="mt-7">Explorer la boutique</Button></section>
  </>
}
