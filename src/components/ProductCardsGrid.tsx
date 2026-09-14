import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductCardsGridProps {
  products: ProductItem[];
  onSubscribe: (product: ProductItem, specificType?: string) => void;
}

export const ProductCardsGrid: React.FC<ProductCardsGridProps> = ({
  products,
  onSubscribe,
}) => {
  return (
    <section id="garanties" className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-16 sm:pb-24">
      {/* Les 5 cartes homogènes : 2 par ligne, la dernière en pleine largeur */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {products.map((product, index) => {
          const isLastAndOdd =
            products.length % 2 === 1 && index === products.length - 1;

          return (
            <article
              key={product.id}
              id={product.id}
              className={`group flex flex-col justify-between rounded-2xl bg-neutral-100/70 hover:bg-neutral-100 transition-colors duration-200 p-8 sm:p-12 ${
                isLastAndOdd ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Grand Titre épuré */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 mb-4">
                  {product.title}
                </h3>

                {/* Tagline nette */}
                <p className="text-base sm:text-lg font-medium text-neutral-800 leading-snug mb-5">
                  {product.tagline}
                </p>

                {/* Paragraphe descriptif sans image */}
                <p
                  className={`text-neutral-600 leading-relaxed text-sm sm:text-base ${
                    isLastAndOdd ? 'max-w-3xl' : 'max-w-xl'
                  }`}
                >
                  {product.lead}
                </p>
              </div>

              {/* Bouton : "À partir de X € / mois" uniquement */}
              <div className="pt-8 sm:pt-12">
                <button
                  type="button"
                  id={`btn-subscribe-${product.id}`}
                  onClick={() => onSubscribe(product)}
                  className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium text-neutral-950 bg-neutral-200/80 hover:bg-neutral-950 hover:text-white px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <span>{product.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
