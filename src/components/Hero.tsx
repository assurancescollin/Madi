import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollToCards: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCards }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex flex-col justify-between max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-12 sm:pb-16">
      {/* Centre : La phrase maîtresse occupant majestueusement la page */}
      <div className="my-auto py-12 max-w-5xl">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-light tracking-tight text-neutral-950 leading-[1.05]">
          L’assurance pensée pour être limpide, protectrice et durable.
        </h1>
      </div>

      {/* Bas de page d'ouverture : petite phrase signature et lien fluide vers les cartes */}
      <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed font-normal">
          Habitation, automobile, santé, prévoyance et retraite. Des contrats épurés et essentiels, sans clauses superflues.
        </p>

        <button
          type="button"
          onClick={onScrollToCards}
          className="inline-flex items-center gap-3 text-xs sm:text-sm font-medium tracking-wide text-neutral-950 hover:text-neutral-500 transition-colors cursor-pointer group self-start sm:self-auto"
        >
          <span className="underline underline-offset-8 decoration-neutral-300 group-hover:decoration-neutral-950 transition-colors">
            Découvrir les contrats
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
