import { Gift, Percent, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Offer = {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  color: string;
  image: string;
  highlight: string;
  includes: string[];
  steps: string[];
  finePrint: string[];
  schedule: string[];
  cta: {
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryTo: string;
  };
};

export const offers: Offer[] = [
  {
    id: 'student-rabat',
    icon: Percent,
    badge: '20% OFF',
    title: 'Student Rabat',
    description: 'Vis dit studiekort og fa 20% rabat pa alle pizzaer',
    color: 'from-primary-dark to-primary',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80',
    highlight: 'Perfekt til studievennerne - spar stort pa dine favoritter.',
    includes: [
      '20% rabat pa alle pizzaer',
      'Gaelder baade klassiske og premium',
      'Kan bruges i butik og ved afhentning',
    ],
    steps: [
      'Vaelg dine pizzaer fra menuen',
      'Medbring gyldigt studiekort',
      'Vis kortet ved betaling eller afhentning',
    ],
    finePrint: [
      'Gaelder ikke drikkevarer eller tilbehor',
      'Kan ikke kombineres med andre tilbud',
      '1 rabat pr. studiekort pr. ordre',
    ],
    schedule: ['Alle dage, hele dagen', 'Gyldigt for studerende med gyldigt ID'],
    cta: {
      primaryLabel: 'Bestil Pizza',
      primaryTo: '/menu',
      secondaryLabel: 'Byg Din Pizza',
      secondaryTo: '/pizza-builder',
    },
  },
  {
    id: 'familie-deal',
    icon: Gift,
    badge: 'KOB 2 FA 1',
    title: 'Familie Deal',
    description: 'Kob 2 store pizzaer og fa en medium pizza gratis',
    color: 'from-primary to-accent',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80',
    highlight: 'Den bedste deal til familier og venner - mere pizza til mindre pris.',
    includes: [
      '2 store pizzaer',
      '1 medium pizza gratis',
      'Fri mix af smage fra hele menuen',
    ],
    steps: [
      'Vaelg 2 store pizzaer',
      'Vaelg 1 medium pizza som gratis',
      'Tilbuddet traekkes automatisk i kurven',
    ],
    finePrint: [
      'Gaelder kun pizzaer, ikke drikkevarer eller tilbehor',
      'Kan ikke kombineres med andre rabatter',
      'Ved udsolgte ingredienser tilbydes alternativ',
    ],
    schedule: ['Alle dage', 'Tilbuddet gaelder for take-away og levering'],
    cta: {
      primaryLabel: 'Start Familie Deal',
      primaryTo: '/menu',
      secondaryLabel: 'Kontakt Os',
      secondaryTo: '/contact',
    },
  },
  {
    id: 'happy-hour',
    icon: Zap,
    badge: 'HURTIG DEAL',
    title: 'Happy Hour',
    description: 'Hver dag kl. 15-17: Alle pizzaer til halv pris!',
    color: 'from-primary-dark to-primary',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&q=80',
    highlight: 'Fang eftermiddagens bedste priser - perfekt til den hurtige sult.',
    includes: [
      '50% pa alle pizzaer',
      'Gaelder alle storrelser',
      'Hurtig service i tidsrummet',
    ],
    steps: [
      'Bestil mellem kl. 15:00 og 17:00',
      'Tilbuddet aktiveres automatisk',
      'Nyd halv pris pa dine pizzaer',
    ],
    finePrint: [
      'Gaelder kun i tidsrummet 15:00-17:00',
      'Kan ikke kombineres med andre tilbud',
      'Gaelder kun pizzaer',
    ],
    schedule: ['Alle dage kl. 15:00-17:00', 'Begraenset tidsrum - kom i god tid'],
    cta: {
      primaryLabel: 'Se Menuen',
      primaryTo: '/menu',
      secondaryLabel: 'Folg Med',
      secondaryTo: '/contact',
    },
  },
];
