import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="border-b border-neutral-200 bg-white py-24 sm:py-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.15]">
          L’assurance pensée pour être limpide, humaine et accessible.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Découvrez nos couvertures conçues pour protéger votre quotidien et votre avenir sans formalités superflues.
        </p>

        <div className="mt-12">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2.5 rounded-full bg-neutral-950 px-7 py-3 text-xs font-medium text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <span>Commencer</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
