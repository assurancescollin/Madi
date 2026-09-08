import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeProductId?: string;
  onSelectProduct: (productId: string) => void;
  onOpenClientPortal: () => void;
  onOpenSubscribe: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProductId,
  onSelectProduct,
  onOpenClientPortal,
  onOpenSubscribe,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 sm:h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand: Logotype Madi épuré */}
        <a
          href="#"
          className="inline-flex items-center hover:opacity-85 transition-opacity"
          aria-label="Accueil Madi"
        >
          <BrandLogo size="md" />
        </a>

        {/* Desktop Links as pill buttons with active indicator */}
        <nav className="hidden md:flex items-center gap-2">
          {PRODUCTS.map((product) => {
            const isActive = activeProductId === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'border border-neutral-200 text-neutral-700 hover:border-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {product.title}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <button
            type="button"
            onClick={onOpenClientPortal}
            className="rounded-full border border-neutral-200 px-4 py-1.5 font-medium text-neutral-700 hover:border-neutral-950 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Espace client
          </button>
          <button
            type="button"
            onClick={onOpenSubscribe}
            className="rounded-full bg-neutral-950 px-4 py-1.5 font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Souscrire
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-neutral-700 cursor-pointer"
          aria-label="Menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav with pills */}
      {menuOpen && (
        <div className="border-b border-neutral-200 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-wrap gap-2 mb-4">
            {PRODUCTS.map((product) => {
              const isActive = activeProductId === product.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onSelectProduct(product.id);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-950 text-white'
                      : 'border border-neutral-200 text-neutral-800 hover:border-neutral-950 hover:bg-neutral-50'
                  }`}
                >
                  {product.title}
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenClientPortal();
              }}
              className="flex-1 rounded-full border border-neutral-200 py-2 text-center text-xs font-medium text-neutral-700"
            >
              Espace client
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenSubscribe();
              }}
              className="flex-1 rounded-full bg-neutral-950 py-2 text-center text-xs font-medium text-white"
            >
              Souscrire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
