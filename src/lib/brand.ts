'use client';

import {
  Clock, Wallet, Shield, Smartphone, Users, MapPin,
  CheckCircle, Send, Zap, Package,
  TrendingUp, Star, MapPinned, DollarSign, Building2,
} from 'lucide-react';
import type { Variants } from 'framer-motion';

/* ─── Brand Colors ─── */
export const B = {
  primary: '#FF3B30',
  primaryDark: '#CC2C24',
  accent: '#FF9500',
  dark: '#1C1C1E',
  gray: '#8E8E93',
  light: '#F5F5F7',
};

/* ─── Animation Variants ─── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Data ─── */
export const BENEFITS = [
  { key: 'flexibility', icon: Clock, title: 'Horaires flexibles', desc: 'Travaillez quand vous voulez. Pas de minimum d\u2019heures, pas de contraintes.' },
  { key: 'pay', icon: Wallet, title: 'Paiement rapide', desc: 'Recevez vos gains chaque semaine directement sur votre Mobile Money.' },
  { key: 'app', icon: Smartphone, title: 'Application intuitive', desc: 'Une app mobile simple pour gérer vos livraisons, itinéraires et gains en temps réel.' },
  { key: 'insurance', icon: Shield, title: 'Assurance incluse', desc: 'Couverture accident et responsabilité civile pendant vos livraisons.' },
  { key: 'community', icon: Users, title: 'Communauté active', desc: 'Rejoignez une communauté de livreurs avec support, formation et événements.' },
  { key: 'zones', icon: MapPin, title: 'Zones multiples', desc: 'Livrez dans plusieurs quartiers et villes. Plus vous livrez, plus vous gagnez.' },
] as const;

export const STEPS = [
  { icon: Send, title: 'Inscrivez-vous', desc: 'Remplissez le formulaire en ligne en 5 minutes.' },
  { icon: CheckCircle, title: 'Vérification KYC', desc: 'Envoyez vos documents. Validation sous 48h.' },
  { icon: Package, title: 'Recevez votre kit', desc: 'Sac de livraison, gilet et accès à l\u2019application.' },
  { icon: Zap, title: 'Commencez à livrer', desc: 'Activez votre statut et recevez vos premières courses.' },
] as const;

export const STATS = [
  { display: '4.8/5', label: 'Note des livreurs', icon: Star },
  { display: '92%', label: 'Taux de rétention', icon: TrendingUp },
  { display: '< 48h', label: 'Délai d\u2019activation', icon: Zap },
  { display: '120+', label: 'Pharmacies partenaires', icon: Building2 },
] as const;

/*
 * Pharmacy coordinates as % of the Cameroon SVG bounding box.
 * GeoViewBox: lon 8.498–16.193, lat 1.653–12.873
 * x% = (lon - 8.498) / (16.193 - 8.498) * 100
 * y% = (12.873 - lat) / (12.873 - 1.653) * 100  (inverted Y)
 *
 * Douala ≈ 9.70°E, 4.05°N  → x≈15.6, y≈78.7
 * Yaoundé ≈ 11.52°E, 3.87°N → x≈39.3, y≈80.3
 * Bafoussam ≈ 10.42°E, 5.47°N → x≈25.0, y≈66.0
 * Kribi ≈ 9.91°E, 2.95°N → x≈18.3, y≈88.5
 * Garoua ≈ 13.40°E, 9.30°N → x≈63.7, y≈31.9
 */
/*
 * Points positioned as % of the MAP CONTAINER (not SVG).
 * SVG (792×1159) in aspect-[3/2] container with xMidYMid meet:
 *   SVG occupies 45.5% of width, centered at 27.2% offset.
 *   x_container = 27.2 + (geo_x_pct * 0.455)
 *   y stays as geo_y_pct (SVG fills height).
 */
export const PHARMACY_POINTS = [
  // Douala cluster
  { x: 34, y: 78, name: 'Pharmacie Akwa', city: 'Douala' },
  { x: 35, y: 77, name: 'Pharmacie Bonabéri', city: 'Douala' },
  { x: 33, y: 80, name: 'Pharmacie Deïdo', city: 'Douala' },
  { x: 35, y: 79, name: 'Pharmacie Bali', city: 'Douala' },
  { x: 36, y: 78, name: 'Pharmacie Bonanjo', city: 'Douala' },
  { x: 33, y: 79, name: 'Pharmacie New Bell', city: 'Douala' },
  { x: 34, y: 81, name: 'Pharmacie Bonapriso', city: 'Douala' },
  { x: 36, y: 76, name: 'Pharmacie Ndokoti', city: 'Douala' },
  // Yaoundé cluster
  { x: 45, y: 80, name: 'Pharmacie Bastos', city: 'Yaoundé' },
  { x: 46, y: 81, name: 'Pharmacie Mokolo', city: 'Yaoundé' },
  { x: 44, y: 79, name: 'Pharmacie Nlongkak', city: 'Yaoundé' },
  { x: 47, y: 82, name: 'Pharmacie Mvog-Mbi', city: 'Yaoundé' },
  { x: 45, y: 83, name: 'Pharmacie Biyem-Assi', city: 'Yaoundé' },
  { x: 46, y: 79, name: 'Pharmacie Essos', city: 'Yaoundé' },
  { x: 44, y: 81, name: 'Pharmacie Melen', city: 'Yaoundé' },
  // Autres villes
  { x: 39, y: 66, name: 'Pharmacie Bafoussam', city: 'Bafoussam' },
  { x: 36, y: 88, name: 'Pharmacie Kribi', city: 'Kribi' },
  { x: 56, y: 32, name: 'Pharmacie Garoua', city: 'Garoua' },
] as const;

export const EARNINGS_WEEKS = [
  { week: 'Sem 1', amount: 45000 },
  { week: 'Sem 2', amount: 62000 },
  { week: 'Sem 3', amount: 58000 },
  { week: 'Sem 4', amount: 85000 },
] as const;

export const REQUIREMENTS = [
  'Pièce d\u2019identité valide (CNI ou passeport)',
  'Smartphone Android ou iOS',
  'Véhicule : moto, vélo ou voiture',
  'Casier judiciaire vierge',
  'Être majeur (18 ans et plus)',
];

export const FAQS = [
  { q: 'Comment suis-je payé ?', a: 'Vous êtes payé instantanément sur votre Mobile Money (Orange Money ou MTN MoMo) à la fin de chaque livraison.' },
  { q: 'Quelles zones sont couvertes ?', a: 'Nous opérons actuellement à Douala, Yaoundé et bientôt dans d\u2019autres villes du Cameroun.' },
  { q: 'Quel véhicule puis-je utiliser ?', a: 'Moto, vélo ou voiture. La moto est recommandée pour une meilleure efficacité en zone urbaine.' },
  { q: 'Puis-je choisir mes horaires ?', a: 'Oui, vous êtes totalement libre. Activez votre statut quand vous êtes disponible, désactivez-le quand vous ne l\u2019êtes plus.' },
  { q: 'L\u2019assurance est-elle vraiment incluse ?', a: 'Oui, tous les livreurs actifs sont couverts par une assurance accident et responsabilité civile pendant leurs livraisons.' },
  { q: 'Puis-je arrêter quand je veux ?', a: 'Oui, sans engagement. Vous pouvez suspendre ou arrêter votre activité à tout moment depuis l\u2019application.' },
];

export const TESTIMONIALS = [
  { name: 'Paul Ngassa', role: 'Livreur moto, Douala', text: 'Depuis que j\u2019ai rejoint ASAP Medoc, je gagne 280 000 FCFA par mois. Le paiement instantané change tout.', date: 'Livreur depuis 8 mois', stars: 5, image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=160&h=160&fit=crop&crop=face' },
  { name: 'Marie Fotso', role: 'Livreuse vélo, Yaoundé', text: 'Les horaires flexibles me permettent de livrer entre mes cours. Je fais 4h par jour et ça me suffit.', date: 'Livreuse depuis 3 mois', stars: 4, image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=160&h=160&fit=crop&crop=face' },
  { name: 'Jean-Pierre Mbarga', role: 'Livreur moto, Douala', text: 'L\u2019application est top, je vois mes gains en temps réel. Le support est réactif sur WhatsApp.', date: 'Livreur depuis 1 an', stars: 5, image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=160&h=160&fit=crop&crop=face' },
  { name: 'Aïcha Moussa', role: 'Livreuse moto, Yaoundé', text: 'J\u2019ai quitté mon ancien job. Ici je suis libre, bien payée, et j\u2019aide les gens à recevoir leurs médicaments.', date: 'Livreuse depuis 6 mois', stars: 4, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&h=160&fit=crop&crop=face' },
  { name: 'Christian Talla', role: 'Livreur voiture, Bafoussam', text: 'Le bonus weekend est génial. Je fais +25% le samedi et dimanche, c\u2019est motivant.', date: 'Livreur depuis 4 mois', stars: 3, image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=160&h=160&fit=crop&crop=face' },
  { name: 'Sandrine Ekane', role: 'Livreuse moto, Douala', text: 'L\u2019assurance me rassure beaucoup. Je roule l\u2019esprit tranquille et mes revenus sont stables.', date: 'Livreuse depuis 10 mois', stars: 5, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face' },
];

export const APP_FEATURES = [
  'Suivi GPS en temps réel',
  'Historique des livraisons',
  'Gains et paiements instantanés',
  'Notifications de nouvelles courses',
];

export const VEHICLE_OPTIONS = [
  { value: 'motorcycle', label: 'Moto' },
  { value: 'bicycle', label: 'Vélo' },
  { value: 'car', label: 'Voiture' },
  { value: 'on_foot', label: 'À pied' },
];

export const MARQUEE_ITEMS = [
  'Paiement instantané',
  'Horaires flexibles',
  'Assurance incluse',
  'Douala',
  'Yaoundé',
  'Livraison express',
  'Communauté active',
  'Application intuitive',
  '5 min pour s\u2019inscrire',
  'Gagnez plus',
];

/* Re-export icons used by components */
export {
  Clock, Wallet, Shield, Smartphone, Users, MapPin,
  CheckCircle, Send, Zap, Package,
  TrendingUp, Star, MapPinned, DollarSign, Building2,
};
