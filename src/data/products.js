import skincare from '../assets/milfleur-skincare.png'
import supplements from '../assets/milfleur-supplements.png'
import hero from '../assets/milfleur-hero.png'

const product = (id, name, slug, category, categorySlug, price, image, description, options = {}) => ({
  id, name, slug, category, categorySlug, price, images: [image, image],
  shortDescription: description,
  description: `${description} Sélectionné par Milfleurs auprès de fournisseurs spécialisés pour intégrer simplement votre routine beauté et bien-être.`,
  oldPrice: null, colors: [], sizes: [], stockStatus: 'Disponible',
  featured: false, newProduct: false, popular: false, customizable: false,
  productionTime: 'Expédition sous 24 à 48 h',
  materials: 'Produit authentique importé',
  careInstructions: 'Respecter les conseils d’utilisation indiqués sur l’emballage.',
  deliveryInformation: 'Livraison selon destination.',
  ...options,
})

export const products = [
  product(1, 'Crème visage éclat', 'creme-visage-eclat', 'Soin visage', 'soins-visage', 12500, skincare, 'Une crème hydratante quotidienne qui aide à préserver l’éclat et le confort de la peau.', { oldPrice: 14500, featured: true, popular: true }),
  product(2, 'Sérum acide azélaïque', 'serum-acide-azelaique', 'Sérums', 'serums', 14000, skincare, 'Un sérum ciblé pour une peau visiblement plus uniforme et une routine tout en douceur.', { featured: true, newProduct: true }),
  product(3, 'Toner hydratant K-Beauty', 'toner-hydratant-kbeauty', 'Beauté coréenne', 'k-beauty', 11000, skincare, 'Une lotion légère inspirée des routines coréennes pour préparer et rafraîchir la peau.', { featured: true, newProduct: true }),
  product(4, 'Crème visage à la mucine', 'creme-visage-mucine', 'Beauté coréenne', 'k-beauty', 15500, skincare, 'Une crème de soin généreuse pour accompagner les peaux en quête de souplesse et d’hydratation.', { featured: true, popular: true }),
  product(5, 'Lait corps réparateur', 'lait-corps-reparateur', 'Corps', 'soins-corps', 13500, hero, 'Un soin corps nourrissant au fini confortable, idéal pour les peaux sèches.', { popular: true }),
  product(6, 'Nettoyant visage doux', 'nettoyant-visage-doux', 'Soin visage', 'soins-visage', 9500, skincare, 'Un nettoyant quotidien qui élimine les impuretés sans sensation de tiraillement.', { newProduct: true }),
  product(7, 'Vitamine B12 énergie', 'vitamine-b12-energie', 'Vitamines', 'vitamines', 8500, supplements, 'Un complément alimentaire en vitamine B12 pour compléter une alimentation équilibrée.', { popular: true }),
  product(8, 'Collagène beauté', 'collagene-beaute', 'Compléments', 'complements', 19500, supplements, 'Une poudre de collagène pensée pour accompagner votre rituel beauté quotidien.', { oldPrice: 22000, popular: true }),
  product(9, 'Complexe minceur 4-en-1', 'complexe-minceur-4-en-1', 'Bien-être', 'bien-etre', 21000, supplements, 'Un complément nutritionnel à intégrer à une hygiène de vie équilibrée.', { newProduct: true }),
  product(10, 'Oméga 3 essentiel', 'omega-3-essentiel', 'Compléments', 'complements', 12000, supplements, 'Des capsules d’oméga 3 sélectionnées pour votre routine bien-être.', {}),
  product(11, 'Sérum vitamine C', 'serum-vitamine-c', 'Sérums', 'serums', 14500, skincare, 'Un soin antioxydant pour illuminer l’apparence du teint.', { newProduct: true }),
  product(12, 'Écran solaire visage SPF50', 'ecran-solaire-visage-spf50', 'Soin visage', 'soins-visage', 13000, skincare, 'Une haute protection solaire légère, confortable au quotidien.', { popular: true }),
]
