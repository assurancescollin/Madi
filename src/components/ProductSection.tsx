import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductSectionProps {
  product: ProductItem;
  index: number;
  onSubscribe: (product: ProductItem, specificType?: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  product,
  index,
  onSubscribe,
}) => {
  const isEven = index % 2 === 0;

  return (
    <section
      id={product.id}
      className="border-b border-neutral-200/70 py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Artwork Column: Style peinture de galerie sur fond monochrome blanc */}
          <div
            className={`lg:col-span-6 ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)]">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover aspect-4/3 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div
            className={`lg:col-span-6 ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
              {product.title}
            </h2>

            <p className="mt-4 text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed">
              {product.tagline}
            </p>

            <div className="mt-7 space-y-4 text-base text-neutral-600 font-normal leading-relaxed max-w-xl">
              <p>{product.lead}</p>
              <p>{product.narrative}</p>
            </div>

            {/* Direct CTA: Dual buttons for Prévoyance or Single CTA for standard products */}
            <div className="mt-10">
              {product.actions && product.actions.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {product.actions.map((action, i) => {
                    const isPrimary = action.variant === 'primary' || i === 0;
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => onSubscribe(product, action.productSpecificType)}
                        className={`group inline-flex flex-col items-start px-6 py-3 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                          isPrimary
                            ? 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-xs'
                            : 'border border-neutral-300 text-neutral-900 hover:border-neutral-950 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="inline-flex items-center gap-2 text-xs font-medium">
                          <span>{action.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </div>
                        {action.sublabel && (
                          <span
                            className={`text-[11px] font-light mt-0.5 ${
                              isPrimary ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            {action.sublabel}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onSubscribe(product)}
                  className="inline-flex items-center gap-3 rounded-full bg-neutral-950 px-7 py-3 text-xs font-medium text-white hover:bg-neutral-800 transition-all duration-200 cursor-pointer shadow-xs group"
                >
                  <span>{product.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
