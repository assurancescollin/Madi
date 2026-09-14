import React, { useState } from 'react';
import { PRODUCTS } from '../data/productsData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectProduct: (id: string) => void;
  onOpenClientPortal: () => void;
  onOpenPartner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectProduct,
  onOpenClientPortal,
  onOpenPartner,
}) => {
  const [isReclamationsOpen, setIsReclamationsOpen] = useState<boolean>(false);

  return (
    <footer className="bg-white pb-16 pt-8 text-xs text-neutral-500">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
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
                    className="hover:text-neutral-950 transition-colors cursor-pointer text-left"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <span className="font-semibold text-neutral-950 block mb-3">
              Services
            </span>
            <ul className="space-y-2">
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
                <button
                  type="button"
                  onClick={onOpenPartner}
                  className="hover:text-neutral-950 transition-colors cursor-pointer"
                >
                  Devenir partenaire
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsReclamationsOpen(true)}
                  className="hover:text-neutral-950 transition-colors cursor-pointer text-left"
                >
                  Réclamations
                </button>
              </li>
              <li>
                <a
                  href="mailto:contact@madi.direct"
                  className="hover:text-neutral-950 transition-colors"
                >
                  contact@madi.direct
                </a>
              </li>
            </ul>
          </div>

          {/* Informations réglementaires (cliquable vers mentions légales externes) */}
          <div>
            <span className="font-semibold text-neutral-950 block mb-3">
              Informations
            </span>
            <a
              href="/mentions-legales"
              className="block space-y-1.5 text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer group"
              title="Consulter les mentions légales"
            >
              <p className="group-hover:underline underline-offset-2">Courtier en assurances indépendant.</p>
              <p className="group-hover:underline underline-offset-2">Enregistré à l'ORIAS sous le n° 26002312.</p>
              <p className="group-hover:underline underline-offset-2">Soumis au contrôle de l'ACPR.</p>
            </a>
            <div className="pt-3">
              <a
                href="https://lnk.bio/assurancescollin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-neutral-500 hover:text-neutral-950 transition-colors hover:underline underline-offset-4"
              >
                @assurancescollin
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Réclamations */}
      {isReclamationsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-none border border-neutral-200 shadow-xl max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsReclamationsOpen(false)}
              className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="space-y-4 text-neutral-700 text-sm">
              <h3 className="text-xl font-bold text-neutral-950">
                Traitement des réclamations
              </h3>
              <div className="space-y-3 pt-2 text-xs leading-relaxed text-neutral-600">
                <p>
                  Chez Madi, nous plaçons la satisfaction client au cœur de nos engagements. Si vous rencontrez une difficulté ou souhaitez nous faire part d’un désaccord :
                </p>
                <div className="p-3 bg-neutral-50 border border-neutral-200">
                  <p className="font-semibold text-neutral-900 mb-1">1. Service Réclamations Madi :</p>
                  <p>Par courriel : <a href="mailto:reclamations@madi.direct" className="underline text-neutral-900">reclamations@madi.direct</a></p>
                  <p className="mt-1 text-[11px] text-neutral-500">Nous nous engageons à accuser réception sous 10 jours ouvrés et à vous apporter une réponse définitive sous 2 mois au maximum.</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200">
                  <p className="font-semibold text-neutral-900 mb-1">2. Médiation de l'Assurance :</p>
                  <p>Si aucun accord n'est trouvé, vous pouvez saisir gratuitement le Médiateur de l’Assurance sur <a href="https://www.mediation-assurance.org" target="_blank" rel="noreferrer" className="underline text-neutral-900">www.mediation-assurance.org</a> ou par courrier à La Médiation de l’Assurance, TSA 50110, 75441 Paris Cedex 09.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
