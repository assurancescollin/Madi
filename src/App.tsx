/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { ProductCarousel } from './components/ProductCarousel';
import { Footer } from './components/Footer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { PRODUCTS } from './data/productsData';
import { ProductItem } from './types';
import { SlidersHorizontal, Layers } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [subscriptionInitialOption, setSubscriptionInitialOption] = useState<string | undefined>(undefined);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<boolean>(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState<boolean>(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'scroll' | 'carousel'>('scroll');

  const handleStartSubscription = (product: ProductItem, specificType?: string) => {
    setSelectedProduct(product);
    setSubscriptionInitialOption(specificType);
    setIsSubscriptionOpen(true);
  };

  const handleOpenGeneralSubscribe = () => {
    setSelectedProduct(PRODUCTS[0]);
    setSubscriptionInitialOption(undefined);
    setIsSubscriptionOpen(true);
  };

  const handleSelectProductFromNav = (productId: string) => {
    const foundIndex = PRODUCTS.findIndex((p) => p.id === productId);
    if (foundIndex !== -1) {
      setActiveCarouselIndex(foundIndex);
    }
    if (viewMode === 'carousel') {
      const carouselEl = document.getElementById('produits-carousel');
      if (carouselEl) {
        carouselEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const target = document.getElementById(productId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased">
      {/* Discreet Layout Mode Switcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-950/90 backdrop-blur-md text-white shadow-2xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('scroll')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'scroll'
                ? 'bg-white text-neutral-950 font-medium shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Format Défilement</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'carousel'
                ? 'bg-white text-neutral-950 font-medium shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Format Carrousel</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        activeProductId={PRODUCTS[activeCarouselIndex]?.id}
        onSelectProduct={handleSelectProductFromNav}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenSubscribe={handleOpenGeneralSubscribe}
      />

      <main className="bg-white">
        {/* Minimalist Hero */}
        <Hero
          onStart={() => handleSelectProductFromNav('habitation')}
        />

        {viewMode === 'scroll' ? (
          /* Format Défilement par défaut : Expérience galerie continue */
          <div className="bg-white">
            {PRODUCTS.map((product, index) => (
              <ProductSection
                key={product.id}
                product={product}
                index={index}
                onSubscribe={handleStartSubscription}
              />
            ))}
          </div>
        ) : (
          /* Format Carrousel compact */
          <ProductCarousel
            products={PRODUCTS}
            activeIndex={activeCarouselIndex}
            onSelectIndex={setActiveCarouselIndex}
            onSubscribe={handleStartSubscription}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectProduct={handleSelectProductFromNav}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenSubscribe={handleOpenGeneralSubscribe}
      />

      {/* Subscription Modal */}
      {selectedProduct && (
        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          product={selectedProduct}
          initialOption={subscriptionInitialOption}
          onClose={() => setIsSubscriptionOpen(false)}
        />
      )}

      {/* Client Portal Modal */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
        onOpenSubscribe={handleOpenGeneralSubscribe}
      />
    </div>
  );
}
