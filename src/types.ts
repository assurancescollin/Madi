export interface ProductAction {
  label: string;
  sublabel?: string;
  variant?: 'primary' | 'secondary';
  productSpecificType?: string;
}

export interface ProductItem {
  id: 'habitation' | 'auto' | 'sante' | 'retraite' | 'prevoyance';
  title: string;
  tagline: string;
  image: string;
  lead: string;
  narrative: string;
  ctaText: string;
  actions?: ProductAction[];
}
