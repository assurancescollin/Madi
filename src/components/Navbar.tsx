import React, { useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onSelectProduct: (productId: string) => void;
  onOpenClientPortal: () => void;
  onOpenPartner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectProduct,
  onOpenClientPortal,
  onOpenPartner,
}) => {
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);

  useEffect(() => {
    if (fullscreenOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenOpen]);

  const handleNavigate = (productId: string) => {
    setFullscreenOpen(false);
    onSelectProduct(productId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-neutral-100">
        <div className="mx-auto flex h-20 sm:h-24 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo Madi */}
          <a
            href="#"
            className="inline-flex items-center hover:opacity-75 transition-opacity"
            aria-label="Accueil Madi"
          >
            <BrandLogo size="md" />
          </a>

          {/* Bouton burger 3 lignes à droite */}
          <button
            type="button"
            id="btn-open-fullscreen-menu"
            onClick={() => setFullscreenOpen(true)}
            className="inline-flex items-center justify-center p-3 text-neutral-950 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-7 h-7 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* Menu en Pleine Page */}
      {fullscreenOpen && (
        <div
          id="fullscreen-navigation-overlay"
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-8 sm:p-14 lg:p-20 animate-in fade-in duration-200"
        >
          {/* Haut du menu */}
          <div className="flex items-center justify-between max-w-[1440px] w-full mx-auto">
            <BrandLogo size="md" />
            <button
              type="button"
              id="btn-close-fullscreen-menu"
              onClick={() => setFullscreenOpen(false)}
              className="inline-flex items-center justify-center p-3 text-neutral-950 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>
          </div>

          {/* Corps du menu */}
          <div className="max-w-[1440px] w-full mx-auto my-auto py-8">
            {/* Titre Index des contrats : même police et style que le reste */}
            <span className="text-base sm:text-lg font-normal text-neutral-500 block mb-8 sm:mb-10">
              Index des contrats
            </span>

            {/* Liste des contrats sans numérotation 01 02 etc */}
            <nav className="space-y-4 sm:space-y-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group border-b border-neutral-100 pb-3">
                  <button
                    type="button"
                    onClick={() => handleNavigate(product.id)}
                    className="w-full flex items-center justify-between text-3xl sm:text-6xl lg:text-7xl font-light text-neutral-900 hover:text-neutral-500 transition-colors text-left cursor-pointer"
                  >
                    <span>{product.title}</span>
                    <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-neutral-400" />
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Pied du menu plein écran : Espace client & Devenir partenaire à côté */}
          <div className="max-w-[1440px] w-full mx-auto pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => {
                  setFullscreenOpen(false);
                  onOpenClientPortal();
                }}
                className="text-xs sm:text-sm font-medium uppercase tracking-wider text-neutral-950 hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Espace client
              </button>

              <button
                type="button"
                onClick={() => {
                  setFullscreenOpen(false);
                  onOpenPartner();
                }}
                className="text-xs sm:text-sm font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                Devenir partenaire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
