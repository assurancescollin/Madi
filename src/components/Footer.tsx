import React from 'react';
import { PRODUCTS } from '../data/productsData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectProduct: (productId: string) => void;
  onOpenClientPortal: () => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectProduct,
  onOpenClientPortal,
  onOpenSubscribe,
}) => {
  return (
    <footer className="border-t border-neutral-200 bg-white py-16 text-xs text-neutral-500">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <BrandLogo size="lg" />
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Une approche épurée de l'assurance pour votre logement, votre voiture, votre santé, votre prévoyance et votre retraite.
            </p>
          </div>

          {/* Products */}
          <div>
            <span className="font-semibold text-neutral-950 block mb-3">
              Nos assurances
            </span>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(p.id)}
                    className="hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-semibold text-neutral-950 block mb-3">
              Services
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenSubscribe}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Souscription
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenClientPortal}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Espace client
                </button>
              </li>
              <li>
                <span className="text-neutral-400">Déclarer un sinistre 24/7</span>
              </li>
            </ul>
          </div>

          {/* Mentions légales / ORIAS */}
          <div>
            <span className="font-semibold text-neutral-950 block mb-3">
              Informations réglementaires
            </span>
            <p className="leading-relaxed text-neutral-500">
              Société de courtage en assurances située 1 rue Marguerin, 75014 Paris, enregistrée à l'Orias N°26002312.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <p>© {new Date().getFullYear()} Madi Assurances. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <span className="hover:text-neutral-600 cursor-pointer">Mentions légales</span>
            <span className="hover:text-neutral-600 cursor-pointer">Confidentialité</span>
            <span className="hover:text-neutral-600 cursor-pointer">Gestion des cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
