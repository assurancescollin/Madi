import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';

interface ProductCarouselProps {
  products: ProductItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onSubscribe: (product: ProductItem, specificType?: string) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  activeIndex,
  onSelectIndex,
  onSubscribe,
}) => {
  const currentProduct = products[activeIndex] || products[0];
  const [direction, setDirection] = useState<number>(0);

  const handlePrev = () => {
    setDirection(-1);
    onSelectIndex((activeIndex - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setDirection(1);
    onSelectIndex((activeIndex + 1) % products.length);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="produits-carousel" className="relative bg-white py-12 sm:py-20 border-b border-neutral-200/70 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Carousel Active Slide with Smooth Animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          >
            {/* Artwork Column: Style peinture de galerie sur fond monochrome blanc pur */}
            <div className="lg:col-span-6">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)]">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover aspect-4/3 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.08]">
                  {currentProduct.title}
                </h2>

                <p className="mt-4 text-lg sm:text-xl text-neutral-800 font-normal leading-relaxed">
                  {currentProduct.tagline}
                </p>

                <div className="mt-7 space-y-4 text-base text-neutral-600 font-normal leading-relaxed max-w-xl">
                  <p>{currentProduct.lead}</p>
                  <p>{currentProduct.narrative}</p>
                </div>
              </div>

              {/* Action and Carousel Controls Row */}
              <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-6">
                {/* Direct CTA (Dual or Single) */}
                {currentProduct.actions && currentProduct.actions.length > 0 ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    {currentProduct.actions.map((action, i) => {
                      const isPrimary = action.variant === 'primary' || i === 0;
                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => onSubscribe(currentProduct, action.productSpecificType)}
                          className={`group inline-flex flex-col items-start px-5 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-left ${
                            isPrimary
                              ? 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-xs'
                              : 'border border-neutral-300 text-neutral-900 hover:border-neutral-950 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="inline-flex items-center gap-2 text-xs font-medium">
                            <span>{action.label}</span>
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </div>
                          {action.sublabel && (
                            <span
                              className={`text-[10px] font-light mt-0.5 ${
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
                    onClick={() => onSubscribe(currentProduct)}
                    className="inline-flex items-center gap-3 rounded-full bg-neutral-950 px-7 py-3 text-xs font-medium text-white hover:bg-neutral-800 transition-all duration-200 cursor-pointer shadow-xs group"
                  >
                    <span>{currentProduct.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}

                {/* Minimalist Carousel Controls (Dots + Numbers + Prev/Next) */}
                <div className="flex items-center gap-4">
                  {/* Subtle Progress Dots */}
                  <div className="flex items-center gap-1.5">
                    {products.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setDirection(idx > activeIndex ? 1 : -1);
                          onSelectIndex(idx);
                        }}
                        aria-label={`Aller à ${p.title}`}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === activeIndex
                            ? 'w-6 h-1.5 bg-neutral-950'
                            : 'w-1.5 h-1.5 bg-neutral-200 hover:bg-neutral-400'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono text-neutral-400 pl-1">
                    0{activeIndex + 1} / 0{products.length}
                  </span>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Produit précédent"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Produit suivant"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
