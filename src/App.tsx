/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCardsGrid } from './components/ProductCardsGrid';
import { Footer } from './components/Footer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { PartnerModal } from './components/PartnerModal';
import { PRODUCTS } from './data/productsData';
import { ProductItem } from './types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [subscriptionInitialOption, setSubscriptionInitialOption] = useState<string | undefined>(undefined);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<boolean>(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState<boolean>(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState<boolean>(false);

  const handleStartSubscription = (product: ProductItem, specificType?: string) => {
    setSelectedProduct(product);
    setSubscriptionInitialOption(specificType);
    setIsSubscriptionOpen(true);
  };

  const handleSelectProductFromNav = (productId: string) => {
    const target = document.getElementById(productId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCards = () => {
    const target = document.getElementById('garanties');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased">
      {/* Navigation épurée avec burger 3 lignes et modales connectées */}
      <Navbar
        onSelectProduct={handleSelectProductFromNav}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenPartner={() => setIsPartnerOpen(true)}
      />

      <main className="bg-white">
        {/* Première page plein écran (100vh) */}
        <Hero onScrollToCards={handleScrollToCards} />

        {/* Deuxième page : les 5 cartes de garanties */}
        <ProductCardsGrid
          products={PRODUCTS}
          onSubscribe={handleStartSubscription}
        />
      </main>

      {/* Footer épuré sans ligne de séparation */}
      <Footer
        onSelectProduct={handleSelectProductFromNav}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenPartner={() => setIsPartnerOpen(true)}
      />

      {/* Modale de souscription directe depuis les cartes */}
      {isSubscriptionOpen && (
        <SubscriptionModal
          initialProduct={selectedProduct}
          initialOption={subscriptionInitialOption}
          onClose={() => setIsSubscriptionOpen(false)}
        />
      )}

      {/* Espace Client : Transmettre un document / Faire une demande sur vos contrats */}
      {isClientPortalOpen && (
        <ClientPortalModal
          isOpen={isClientPortalOpen}
          onClose={() => setIsClientPortalOpen(false)}
        />
      )}

      {/* Modale Devenir partenaire */}
      {isPartnerOpen && (
        <PartnerModal
          isOpen={isPartnerOpen}
          onClose={() => setIsPartnerOpen(false)}
        />
      )}
    </div>
  );
}
