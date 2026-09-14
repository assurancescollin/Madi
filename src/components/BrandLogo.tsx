import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  light = false,
}) => {
  const sizeConfig = {
    sm: 'text-2xl sm:text-[28px]',
    md: 'text-3xl sm:text-[38px]',
    lg: 'text-4xl sm:text-[48px]',
    xl: 'text-5xl sm:text-[64px]',
  };

  const fontSizeClass = sizeConfig[size] || sizeConfig.md;
  const textColor = light ? 'text-white' : 'text-neutral-950';

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      aria-label="madi"
    >
      {/* 
        Logotype "madi" vectoriel haute définition :
        - Typographie géométrique épurée (famille Poppins ExtraBold 800)
        - 'm' sans barre gauche parasite, arches équilibrées
        - 'a' et 'd' à bols circulaires rigoureux
        - 'i' avec point circulaire parfait
      */}
      <span
        className={`${fontSizeClass} ${textColor} font-[800] leading-none tracking-[-0.04em] lowercase inline-block`}
        style={{
          fontFamily: "'Poppins', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 800,
          letterSpacing: '-0.04em',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        madi
      </span>
    </div>
  );
};
