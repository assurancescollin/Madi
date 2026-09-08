import { ProductItem } from '../types';

import habitationArt from '../assets/images/habitation_white_yellow_1788860216977.jpg';
import autoArt from '../assets/images/auto_white_red_1788860229826.jpg';
import santeArt from '../assets/images/sante_white_green_1788860241881.jpg';
import prevoyanceArt from '../assets/images/prevoyance_white_purple_1788860934088.jpg';
import retraiteArt from '../assets/images/retraite_white_blue_1788860254557.jpg';

export const PRODUCTS: ProductItem[] = [
  {
    id: 'habitation',
    title: 'Habitation',
    tagline: 'Un endroit où poser ses valises et respirer en paix.',
    image: habitationArt,
    lead:
      'Un chez-soi n’est jamais une simple surface en mètres carrés. C’est la lumière du matin sur un parquet ancien, la pile de livres au chevet, les rires partagés autour d’une table et la certitude de retrouver un sanctuaire intact à la fin du jour.',
    narrative:
      'Nous avons pensé l’assurance habitation non pas comme une suite de clauses juridiques, mais comme une présence discrète qui veille sur votre quotidien. Qu’un tuyau cède un dimanche soir, qu’un orage gronde ou qu’une porte claque par mégarde, le lien avec votre chez-vous reste inaltéré.',
    ctaText: 'À partir de 4 € / mois',
  },
  {
    id: 'auto',
    title: 'Auto',
    tagline: 'La liberté de prendre la route sans jamais regarder en arrière.',
    image: autoArt,
    lead:
      'L’automobile est l’un des rares espaces où l’on s’appartient encore entièrement. Le trajet matinal où les idées s’éclaircissent, l’escapade improvisée vers l’océan à la tombée de la nuit, les enfants endormis sur la banquette arrière au retour des vacances.',
    narrative:
      'Cette liberté n’a de sens que si la route est sûre. Notre accompagnement efface l’angoisse du voyage : de votre allée de garage jusqu’aux routes de traverse les plus isolées, nous sommes ce fil invisible qui vous ramène toujours chez vous, quoi qu’il advienne.',
    ctaText: 'À partir de 11 € / mois',
  },
  {
    id: 'sante',
    title: 'Santé',
    tagline: 'Prendre soin de son corps au rythme naturel des saisons.',
    image: santeArt,
    lead:
      'La santé ne se résume pas aux journées d’alitement ou aux ordonnances. Elle vit dans l’énergie avec laquelle on se réveille, dans la clarté du regard, la sérénité de l’esprit et la certitude de pouvoir être écouté dès que le corps envoie un signal.',
    narrative:
      'Nous refusons que prendre soin de soi devienne un calcul ou une hésitation financière. Notre complémentaire élimine la paperasse, rembourse en temps réel et ouvre grand les portes des médecins, des praticiens du bien-être et des spécialistes sans aucune barrière.',
    ctaText: 'À partir de 16 € / mois',
  },
  {
    id: 'prevoyance',
    title: 'Prévoyance',
    tagline: 'Mettre ceux qu’on aime et ses projets à l’abri des tempêtes.',
    image: prevoyanceArt,
    lead:
      'Protéger son avenir ne procède pas de la peur, mais d’un élan de tendresse et de lucidité. C’est la certitude que votre famille conservera son niveau de vie, que vos crédits seront honorés et que rien ne viendra briser les promesses faites à ceux qui comptent le plus.',
    narrative:
      'Qu’il s’agisse de sécuriser vos proches face aux aléas de la vie ou d’assurer votre prêt immobilier au juste coût (sans les marges bancaires excessives), nous créons un bouclier patrimonial sur mesure, clair et transparent.',
    ctaText: 'Découvrir la prévoyance',
    actions: [
      {
        label: 'Prévoyance individuelle & famille',
        sublabel: 'Revenus & proches protégés dès 9 €/mois',
        variant: 'primary',
        productSpecificType: 'individuelle',
      },
      {
        label: 'Assurance emprunteur',
        sublabel: 'Économisez jusqu’à 50% sur votre crédit',
        variant: 'secondary',
        productSpecificType: 'emprunteur',
      },
    ],
  },
  {
    id: 'retraite',
    title: 'Retraite',
    tagline: 'Bâtir demain pour savourer pleinement chaque instant d’aujourd’hui.',
    image: retraiteArt,
    lead:
      'Penser à l’avenir n’a rien à voir avec le fait de vieillir : c’est s’offrir le privilège souverain de choisir. Choisir son rythme de vie, choisir de voyager, choisir de transmettre ou simplement de s’asseoir en terrasse sans compter les heures.',
    narrative:
      'L’épargne retraite ne devrait pas être un jargon obscur figé pour quarante ans. Nous en avons fait un compagnon vivant qui allège vos impôts dès cette année, s’adapte aux soubresauts de votre parcours et reste mobilisable lorsque se présente l’opportunité de votre vie.',
    ctaText: 'Ouvrir mon Plan d\'Épargne Retraite',
  },
];
